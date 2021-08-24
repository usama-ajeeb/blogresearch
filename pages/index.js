import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [urls, setUrls] = useState([])
  console.log(urls)

  const fetchUrls = async () => {
    await fetch(`/api/urls`).then((res) => setUrls(res.json()))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/urls`, {
      method: 'POST',
      body: JSON.stringify({ keyword }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = response.json()
    console.log(data)
  }

  return (
    <div>
      <Head>
        <title>Blog Research</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <form action='' onSubmit={submitHandler}>
          <input
            type='text'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}
