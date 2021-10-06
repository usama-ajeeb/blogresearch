import axios from 'axios'
import cheerio from 'cheerio'
require('events').defaultMaxListeners = 100

import puppeteer from 'puppeteer'

export default async function Urls(req, res) {
  try {
    if (req.method === 'GET') {
      res.status(200).json('Hello test')
    } else if (req.method === 'POST') {
      // Getting urls from datafor seo api
      const keyword = req.body.keyword
      const country = req.body.country

      let browser
      let urls = []

      browser = await puppeteer.launch()
      const [page] = await browser.pages()
      await page.goto('https://www.google.com/')
      await page.waitForSelector('input[aria-label="Search"]', {
        visible: true,
      })
      await page.waitForTimeout(1000)
      await page.type('input[aria-label="Search"]', keyword, { delay: 500 })
      await Promise.all([
        page.waitForNavigation(),
        page.keyboard.press('Enter', { delay: 500 }),
      ])
      await page.waitForSelector('.LC20lb', { visible: true, timeout: 150000 })
      const searchResults = await page.evaluate(() =>
        [...document.querySelectorAll('.LC20lb')].map((e) => ({
          title: e.innerText,
          link: e.parentNode.href,
        }))
      )
      searchResults.map((i) => urls.push(i.link))
      await page.waitForTimeout(1000)
      await browser.close()

      // scrapping

      const tagsArray = []
      await Promise.all(
        urls.map(async (i, index) => {
          await axios
            .get(i)
            .then((res) => {
              const $ = cheerio.load(res.data)
              let tags = []
              let tagList = []
              $('h1,H1,h2,H2,h3,H3').each(function (indexx, element) {
                tags.push($(element).prop('tagName') + ' | ' + $(this).text())
                tagList.push($(element).prop('tagName'))
              })

              let webText = []

              $('h1,H1,h2,H2,h3,H3,H4,p').each(function (i, el) {
                webText.push($(this).text())
              })

              let facts = []

              $('p, span').each(function (i, el) {
                facts.push($(this).text())
              })

              let images = []
              $('img').each(function (i, element) {
                images.push($(element).prop('tagName'))
              })

              let summ = []
              $('p').each(function (i, el) {
                summ.push($(this).text())
              })

              tagsArray.push({
                url: urls[index],
                tagg: tags,
                webText: webText,
                images: images,
                tagList: tagList,
                facts: facts,
                // peopleAsk: peopleAsk,
                summary: summ,
              })
            })
            .catch((err) => {
              if (err.response) {
                // client received an error response (5xx, 4xx)
                console.log('response error')
              } else if (err.request) {
                // client never received a response, or request never left
                console.log('request erro')
              } else {
                // anything else
                console.log('another error')
              }
            })
        })
      )

      res.status(201).json(tagsArray)
    }
  } catch (error) {
    console.error(error)
  }
}
