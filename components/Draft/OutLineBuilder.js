import React, { useState } from 'react'
import { BackspaceIcon } from '@heroicons/react/outline'
// import dynamic from 'next/dynamic'
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
// import 'react-quill/dist/quill.snow.css'

function OutLineBuilder({ list, deleteHandler }) {
  return (
    <div className='w-[850px]'>
      <h1 className='text-center font-semibold text-4xl text-gray-600'>
        Outline Builder
      </h1>
      <div className='bg-white border my-5 p-8'>
        {/* Text editor */}
        {list?.map((item, index) => (
          <p className='py-2 ' key={index}>
            {item}{' '}
            <span className='cursor-pointer text-xs underline text-red-600'>
              <a onClick={() => deleteHandler(index)} href='#'>
                remove
              </a>
            </span>
            {/* <BackspaceIcon
              onClick={() => deleteHandler(index)}
              className='h-7 text-blue-500'
            /> */}
          </p>
        ))}
      </div>
    </div>
  )
}

export default OutLineBuilder
