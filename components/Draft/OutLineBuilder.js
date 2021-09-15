import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

function OutLineBuilder() {
  const [value, setValue] = useState('')
  console.log(value)
  return (
    <div className=' '>
      <h1 className='text-center font-semibold text-4xl text-gray-600'>
        Outline Builder
      </h1>
      <ReactQuill
        value={value}
        onChange={setValue}
        placeholder='Create awesome contents'
      />
    </div>
  )
}

export default OutLineBuilder
