import { useRouter } from 'next/dist/client/router'
import React, { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useDispatch } from 'react-redux'
import db, { auth, provider } from '../utils/firebase/firebase'
import { loginAction } from '../redux/actions'
import { useSelector } from 'react-redux'

function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [users] = useCollection(db.collection('users'))

  const Logins = useSelector((state) => state.Logins)
  const { userInfo, error } = Logins

  const signIn = async (e) => {
    dispatch(loginAction())
  }
  return (
    <div className=' flex justify-center'>
      <div className='bg-white  p-3 shadow-2xl mt-60 text-center'>
        <div className=' border-b my-2 py-1'>
          {/* header */}
          <h1 className='text-2xl font-semibold py-2'>Blog Research</h1>
          <p className='w-8/12 mx-auto'>
            Sign in to <span className='font-semibold'>Google</span> to continue
            to <span className='font-semibold'>Blog Research</span>
          </p>
        </div>
        <div>{/* inputs */}</div>
        <div className=''>
          {/* Button */}
          <button
            onClick={() => signIn()}
            className='hover:bg-red-300 bg-red-400 active:scale-95 w-full rounded-xl text-white font-bold text-lg py-1 my-5'
          >
            Sign In
          </button>
        </div>
        <div>
          {/* footer */}
          <p className='text-sm text-gray-500 border-t'>
            Unlock the power of contents
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
