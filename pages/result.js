import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import { Nav } from '../components/Header/Nav'
import { useSelector } from 'react-redux'
import OutLineBuilder from '../components/Draft/OutLineBuilder'
import Sidebar from '../components/Sidebar/Sidebar'

function result() {
  const router = useRouter()
  const { keyword, location } = router.query

  const [list, setList] = useState([])

  // delete items
  const deleteHandler = (id) => {
    setList((item) => {
      return item.filter((el, index) => {
        return index !== id
      })
    })
  }

  return (
    <div>
      <Nav />

      <div className='flex justify-between mt-9 max-w-[1600px] mx-auto '>
        {/* Outline Builder */}
        <div className=''>
          <OutLineBuilder list={list} deleteHandler={deleteHandler} />
        </div>
        <div className=''>
          <Sidebar
            list={list}
            setList={setList}
            deleteHandler={deleteHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default result
