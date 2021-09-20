import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  creditsAction,
  HtagsAction,
  UpdateCreditAction,
} from '../redux/actions'
import { Header } from '../components/Header/Header'
import { countries } from '../Data/countries'

import Login from '../components/Login'
import db from '../utils/firebase/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase/firebase'

export default function Home({ UserData, credit }) {
  const [user] = useAuthState(auth)
  const [users, load, err] = useCollection(db.collection('users'))
  const router = useRouter()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [country, setCountry] = useState(countries[0])
  // const [credit, setCredit] = useState('')
  const Htags = useSelector((state) => state.Htags)
  const { loading, error } = Htags
  const Logins = useSelector((state) => state.Logins)
  const { userInfo } = Logins

  const Credits = useSelector((state) => state.Credits)
  const { credits } = Credits
  const creditsUpdate = useSelector((state) => state.creditsUpdate)
  const { updatedCredits } = creditsUpdate
  console.log(credits, 'Updated', updatedCredits)

  useEffect(() => {
    let loading = true

    dispatch(creditsAction()).then(() => {
      loading = false
    })

    return () => {}
  }, [user, users])

  const handleChange = useCallback(
    (e) => {
      setKeyword(e.target.value)
    },
    [setKeyword]
  )
  const submitHandler = async (e) => {
    e.preventDefault()

    dispatch(HtagsAction(keyword, country)).then(() => {
      router.push({
        pathname: '/result',
        query: {
          location: country.name,
          keyword: keyword,
        },
      })
    })
    dispatch(UpdateCreditAction())
  }

  return (
    <div className='bg-gray-50 h-screen'>
      <Head>
        <title>Blog Research</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header>
        {!userInfo ? (
          <Login />
        ) : (
          <Header
            handleChange={handleChange}
            submitHandler={submitHandler}
            keyword={keyword}
            country={country}
            setCountry={setCountry}
            loading={loading}
            credits={credits}
          />
        )}
      </header>
      {loading && (
        <div className='flex items-center justify-center flex-col gap-y-3'>
          <h1 className='  animate-pulse text-red-400  text-7xl font-bold mt-9'>
            {' '}
            Processing
          </h1>
          <p className='text-lg text-gray-700 font-bold'>
            We admire your patience
          </p>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const usersRef = db.collection('users')

  const Data = await usersRef.get()
  const UserData = Data.docs.map((doc) => doc.data())

  return {
    props: {
      UserData,
    }, // will be passed to the page component as props
  }
}
