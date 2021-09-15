import React from 'react'

function Htag({ data }) {
  return (
    <div className='border bg-white'>
      <li className='list-none '>
        {data.map(({ tagg, url }) => (
          <>
            <p className='text-xl text-blue-400 py-2  bg-white truncate w-8/12 pl-4'>
              <a href={url} target='_blank'>
                {url}
              </a>
            </p>
            <p>
              {tagg.map((i) => (
                <p className='py-2 px-6  bg-white text-black'>{i}</p>
              ))}
            </p>
          </>
        ))}
      </li>
    </div>
  )
}

export default Htag
