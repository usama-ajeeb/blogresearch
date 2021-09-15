import { useRouter } from 'next/dist/client/router'
import React from 'react'

export const Nav = () => {
  const router = useRouter()
  return (
    <nav className='flex justify-around items-center bg-gradient-to-r from-green-400 to-blue-500  py-5'>
      <div onClick={() => router.push('/')} className='cursor-pointer'>
        <h1 className='text-2xl font-extrabold text-red-600'>
          Blog <span className='text-red-500 font-bold opacity-1'>Reseach</span>{' '}
        </h1>
      </div>
      {/* Menu Item */}
      <div className='flex items-center gap-x-5'>
        <p className='text-lg font-bold text-gray-700'>About</p>
        <p className='text-lg font-bold text-gray-700'>Contact</p>
        <p className='text-lg font-bold text-gray-700'>More</p>
      </div>
    </nav>
  )
}
