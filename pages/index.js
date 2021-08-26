import axios from 'axios'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import SearchInput from '../components/SearchInput'

export default function Home() {
  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState([])

  console.log(data)

  const handleChange = useCallback(
    (e) => {
      setKeyword(e.target.value)
    },
    [setKeyword]
  )
  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/api/urls`, {
      method: 'POST',
      body: JSON.stringify({ keyword }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    setData(data)
  }

  return (
    <div>
      <Head>
        <title>Blog Research</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <SearchInput
          handleChange={handleChange}
          submitHandler={submitHandler}
          keyword={keyword}
        />
      </div>
    </div>
  )
}
