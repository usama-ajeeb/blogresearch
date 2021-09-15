import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Summary({ data }) {
  const [s, setS] = useState('')

  const test = data.map(({ summary }) => {
    return summary.join(' ')
  })
  console.log(test)

  // useEffect(() => {
  //   data.map(({ webText }) => webText.map((i) => console.log(i)))
  // }, [])

  useEffect(() => {
    const FetchSummary = async () => {
      await axios({
        method: 'POST',
        url: 'https://gpt-summarization.p.rapidapi.com/summarize',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'gpt-summarization.p.rapidapi.com',
          'x-rapidapi-key':
            '60a7fa1952mshca4d1ec3effc7f3p1057d6jsn80488a23ece0',
        },
        data: {
          text: test,
          num_sentences: 3,
        },
      }).then((res) => console.log(res.data))
    }
    FetchSummary()
  }, [])

  return <div></div>
}

export default Summary
