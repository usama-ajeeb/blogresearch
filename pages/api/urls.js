import axios from 'axios'
import cheerio from 'cheerio'

export default async function Urls(req, res) {
  try {
    if (req.method === 'GET') {
      res.status(200).json('Hello test')
    } else if (req.method === 'POST') {
      // Getting urls from datafor seo api
      const keyword = req.body.keyword
      const country = req.body.country

      const urls = []
      const peopleAsk = []
      const post_array = []
      post_array.push({
        language_code: 'en',
        location_name: country,
        keyword: keyword,
        depth: 25,
      })

      await axios({
        method: 'post',

        url: 'https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
        auth: {
          username: 'easycomlife@gmail.com',
          password: 'dd56269ad5986a27',
        },
        data: post_array,
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => {
        response.data['tasks']?.map((i, index) =>
          // i.result['0']['items']?.map((i) => console.log(i['items']))
          i.result['0']['items']?.map((i) =>
            i['items']?.map((i) => peopleAsk.push(i.title))
          )
        )

        response.data['tasks']?.map((i, index) =>
          i.result['0']['items']?.map((i) =>
            i['url'] != undefined ? urls.push(i['url']) : i
          )
        )
      })
      // .catch((error) => console.error(error))

      // Scrapping

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
                peopleAsk: peopleAsk,
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
