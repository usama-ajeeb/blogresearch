import React, { useState } from 'react'
import { Packer, Document, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver'

// import dynamic from 'next/dynamic'
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
// import 'react-quill/dist/quill.snow.css'

function OutLineBuilder({ list, deleteHandler }) {
  const generate = () => {
    const listItem = list.map((i) => i)

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: String(listItem),
            }),
          ],
        },
      ],
    })

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'example.docx')
    })
  }
  return (
    <div className='w-[850px]'>
      <h1
        onClick={generate}
        className='text-center font-semibold text-4xl text-gray-600'
      >
        Outline Builder
      </h1>
      <div className='bg-white border my-5 p-8 overflow-scroll h-[685px]'>
        {/* Text editor */}
        {list?.map((item, index) => (
          <p className='py-2 ' key={index}>
            {item}{' '}
            <span className='cursor-pointer text-xs underline text-red-600'>
              <a onClick={() => deleteHandler(index)} href='#'>
                remove
              </a>
            </span>
          </p>
        ))}
      </div>
    </div>
  )
}

export default OutLineBuilder
