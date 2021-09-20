import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Header/Nav'
import { useSelector } from 'react-redux'
import OutLineBuilder from '../components/Draft/OutLineBuilder'
import Sidebar from '../components/Sidebar/Sidebar'
import db, { auth } from '../utils/firebase/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'

function result() {
  const router = useRouter()
  const [users, load, err] = useCollection(db.collection('users'))
  const [list, setList] = useState([])
  const [credit, setCredits] = useState('')
  const Htags = useSelector((state) => state.Htags)
  const { loading, error } = Htags

  // delete items
  const deleteHandler = (id) => {
    setList((item) => {
      return item.filter((el, index) => {
        return index !== id
      })
    })
  }

  useEffect(() => {
    const FetchCredits = async () => {
      const creditsRef = db.collection('users')
      let allCredits = await creditsRef.get()
      const credits = allCredits.docs
        .map((i) => i.data())
        .filter((i) => i.uid?.includes(auth.currentUser.uid))
        .map((i) => i.credits)
      setCredits(credits)
    }
    FetchCredits()
  }, [users])

  return (
    <div>
      <Nav ResultCredit={credit} />

      {loading ? (
        <div className='flex items-center justify-center flex-col gap-y-3'>
          <h1 className='  animate-pulse text-red-400  text-7xl font-bold mt-9'>
            {' '}
            Processing
          </h1>
          <p className='text-lg text-gray-700 font-bold'>
            We admire your patience
          </p>
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default result
