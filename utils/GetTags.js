import axios from 'axios'
import cheerio from 'cheerio'

// getting urls from dataforseo Api
export const GetUrls = async (keyword) => {
  const urls = []

  const post_array = []
  post_array.push({
    language_code: 'en',
    location_code: 2840,
    keyword: keyword,
    depth: 15,
  })

  await axios({
    method: 'post',

    url: 'https://api.dataforseo.com/v3/serp/google/organic/live/advanced',
    auth: {
      username: 'votexe7992@cytsl.com',
      password: 'e496a5c48333a51c',
    },
    data: post_array,
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => {
      response['data']['tasks']?.map((i, index) =>
        i.result['0']['items']?.map((i) =>
          i['url'] != undefined ? urls.push(i['url']) : i
        )
      )
    })
    .catch((error) => console.error(error))
  return urls
}

// Html htags scrapping with cheerio
export const GetTags = async (keyword) => {
  const urls = await GetUrls(keyword)

  const tagsArray = []

  await Promise.all(
    urls.map(async (i, index) => {
      await axios.get(i).then((res) => {
        const $ = cheerio.load(res.data)

        let tags = []
        let tagList = []
        $('h1,H1,h2,H2,h3,H3').each(function (indexx, element) {
          tags.push($(element).prop('tagName') + ' | ' + $(this).text())
          tagList.push($(element).prop('tagName'))
        })

        let webText = []

        $('body').each(function (i, el) {
          webText.push($(this).text())
        })

        let images = []
        $('img').each(function (i, element) {
          images.push($(element).prop('tagName'))
        })

        let obl = []
        $('a').each(function (i, element) {
          obl.push($(element).prop('tagName'))
        })

        tagsArray.push({
          url: urls[index],
          tagg: tags,
          webText: webText,
          images: images,
          tagList: tagList,
          obl: obl,
        })
      })
    })
  )

  return tagsArray
}
