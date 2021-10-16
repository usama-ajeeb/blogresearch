import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { auth } from '../../utils/firebase/firebase'
import Image from 'next/image'

export const Nav = ({ ResultCredit, credits }) => {
  const router = useRouter()

  const signOut = () => {
    localStorage.clear()
    auth.signOut().then(() => router.push('/').then(() => router.reload()))
  }
  return (
    <nav className='flex justify-around items-center bg-[#404040]  py-5'>
      <div
        onClick={() => router.push('/')}
        className='cursor-pointer relative h-[100px]  w-[230px]'
      >
        {/* <h1 className='text-2xl font-extrabold text-red-600'>
          Blog <span className='text-red-500 font-bold opacity-1'>Reseach</span>{' '}
        </h1> */}
        <Image
          src='https://gtaseo.ca/wp-content/uploads/2021/05/Copy-of-Copy-of-GTA-SEO.png'
          layout='fill'
          objectFit='contain'
        />
      </div>
      {/* Menu Item */}
      <div className='flex items-center gap-x-5'>
        <p className='text-lg font-bold text-gray-100'>About</p>
        <p className='text-lg font-bold text-gray-100'>Contact</p>
        <p className='text-lg font-bold text-gray-100'>More</p>
        <div className='flex items-center gap-x-2 bg-blue-300 p-2 rounded-xl'>
          <button
            onClick={signOut}
            className='bg-green-400 text-white rounded-full p-2'
          >
            Sign out
          </button>
          <p>credits: {credits || ResultCredit}</p>
        </div>
      </div>
    </nav>
  )
}
