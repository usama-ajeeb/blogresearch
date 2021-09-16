import React, { useState } from 'react'

function Htag({ data, list, setList, deleteHandler }) {
  return (
    <div className='border bg-white'>
      <li className='list-none '>
        {data?.map(({ tagg, url }, index) => (
          <>
            <p className='text-xl text-blue-400 py-2  bg-white truncate w-8/12 pl-4'>
              <a href={url} target='_blank'>
                {url}
              </a>
            </p>
            <p>
              {tagg?.map((i) => (
                <>
                  <p
                    onClick={() => setList(list.concat(i.slice(0, i.length)))}
                    className='py-2 px-6  bg-white text-black  cursor-pointer border-b border-gray-100 hover:font-bold'
                  >
                    {i}
                  </p>
                </>
              ))}
            </p>
          </>
        ))}
      </li>
    </div>
  )
}

export default Htag
