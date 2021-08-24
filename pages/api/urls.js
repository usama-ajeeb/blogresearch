import { GetTags } from '../../utils/GetTags'

export default async function Urls(req, res) {
  if (req.method === 'GET') {
    res.status(200).json('Hello World')
  } else if (req.method === 'POST') {
    const keyword = req.body.keyword

    const Tags = await GetTags(keyword)

    res.status(201).json(Tags)
  }
}
