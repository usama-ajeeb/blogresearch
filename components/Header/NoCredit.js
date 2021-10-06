import { useRouter } from 'next/dist/client/router'
import React from 'react'

function NoCredit() {
  const router = useRouter()
  return (
    <div className='text-center text-7xl  text-red-700 mt-44 font-mono'>
      <h1>You Need Credits</h1>
      <button
        onClick={() => router.push('/checkout')}
        className='text-xl bg-green-600 px-5 py-2 font-sans my-7 rounded-full text-white'
      >
        Buy Credits
      </button>
    </div>
  )
}

export default NoCredit
