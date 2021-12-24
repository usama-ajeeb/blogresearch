const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const { request } = require('express')
const { default: axios } = require('axios')
const cheerio = require('cheerio')

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())

// routes
03005234812
app.get('/', (req, res) => res.status(200).send('hello world'))

app.post('/blog', async (req, res) => {
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
      username: 'jewipiw420@secbuf.com',
      password: 'fd1962643a2cadf4',
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

  res.json(tagsArray)
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.api = functions.https.onRequest(app)
