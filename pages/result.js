import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Nav } from '../components/Header/Nav'
import { useSelector } from 'react-redux'
import OutLineBuilder from '../components/Draft/OutLineBuilder'
import Sidebar from '../components/Sidebar/Sidebar'

function result() {
  const router = useRouter()
  const { keyword, location } = router.query

  return (
    <div>
      <Nav />

      <div className='flex justify-between mt-9 max-w-[1600px] mx-auto '>
        {/* Outline Builder */}
        <div className=''>
          <OutLineBuilder />
        </div>
        <div className=''>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default result
