import React, { useEffect, useState } from 'react'
import {
  ExternalLinkIcon,
  PencilIcon,
  PhotographIcon,
} from '@heroicons/react/outline'

function Overview({ data }) {
  const [avgText, setAvgText] = useState([])
  const [avgImages, setAvgImages] = useState([])
  const [avgTags, setAvgTags] = useState([])

  useEffect(() => {
    const getText = () => {
      let textArr = []
      data
        ?.map((i) => i.webText)
        .map((i) => {
          return textArr.push(i)
        })

      const res =
        textArr
          .join('')
          .split(' ')
          .filter((i) => i !== '' && i !== '\n' && i !== '\n\n').length / 10

      return res
    }
    const TextCount = getText()
    setAvgText(TextCount)

    setAvgImages(
      data
        ?.map((i) => i.images)
        .map((i) => i.length)
        .reduce((a, c) => a + c, 0) / 10
    )
    setAvgTags(
      data
        ?.map((i) => i.tagList)
        .map((i) => i.length)
        .reduce((a, c) => a + c, 0) / 10
    )
  }, [])

  return (
    <div>
      <div>
        {/* Avg toolbar */}
        <h1 className='text-2xl text-center font-semibold'>Averages</h1>
        <div className='flex items-center py-4 justify-center space-x-4'>
          <div className='flex items-center space-x-2 border p-2 rounded-2xl'>
            <p>Average Words:</p>
            <p>{Math.floor(avgText)}</p>
          </div>
          <div className='flex items-center space-x-2 border p-2 rounded-2xl'>
            <p>Average Htags:</p>
            <p>{Math.floor(avgTags)}</p>
          </div>
          <div className='flex items-center space-x-2 border p-2 rounded-2xl'>
            <p>Average Images:</p>
            <p>{Math.floor(avgImages)}</p>
          </div>
        </div>
      </div>
      <div className=' bg-white text-black border shadow-xl h-[600px] overflow-scroll overflow-x-hidden'>
        <h1 className='text-center text-xl font-bold text'></h1>
        {data?.map(({ url, tagg, images, webText }) => (
          <div key={url} className='shadow-sm py-1 my-2 border-t  bg-white'>
            <li className=' list-decimal pl-4 flex items-center'>
              <div className='w-[350px] truncate'>{url}</div>
              <a href={url} target='_blank'>
                <ExternalLinkIcon className='h-4 text-blue-600' />
              </a>
            </li>
            <div className='flex items-centerpl ml-6 space-x-2  '>
              <div className='flex items-center gap-x-1 border p-1 rounded-lg'>
                <PencilIcon className='h-4' />{' '}
                {
                  webText
                    .join('')
                    .split(' ')
                    .filter((i) => i !== '' && i !== '\n' && i !== '\n\n')
                    .length
                }
              </div>
              <div className='flex items-center border p-1 rounded-lg'>
                <PhotographIcon className='h-4' /> {images.length}
              </div>
              <div className='border p-1 rounded-lg'>
                Headings: {tagg.length}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Overview
