import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HtagsAction } from '../redux/actions'
import { Header } from '../components/Header/Header'
import { countries } from '../Data/countries'

import Login from '../components/Login'
import db from '../utils/firebase/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase/firebase'

export default function Home({ UserData }) {
  const [user] = useAuthState(auth)
  const [users, load, err] = useCollection(db.collection('users'))
  const router = useRouter()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [country, setCountry] = useState(countries[0])
  const [credit, setCredit] = useState('')
  const Htags = useSelector((state) => state.Htags)
  const { loading, error } = Htags
  const Logins = useSelector((state) => state.Logins)
  const { userInfo } = Logins

  if (credit) {
    console.log('data', credit)
  }

  const updateCredits = async () => {
    const id = UserData.filter((i) => i.uid?.includes(userInfo?.uid)).map(
      (id) => id.docId
    )
    console.log(id)
    if (credit) {
      await db
        .collection('users')
        .doc(String(id))
        .update({ credits: credit - 1 })
    }
  }

  useEffect(() => {
    let cancel = false
    const Fetchcredits = () => {
      UserData.filter((i) => i.uid?.includes(userInfo?.uid)).map((credit) => {
        if (cancel) return
        setCredit(credit.credits)
      })
    }
    Fetchcredits()

    return () => {
      cancel = true
    }
  }, [user, users])

  const handleChange = useCallback(
    (e) => {
      setKeyword(e.target.value)
    },
    [setKeyword]
  )
  const submitHandler = async (e) => {
    e.preventDefault()

    dispatch(HtagsAction(keyword, country))
      .then(() => {
        if (!error && credit) {
          setCredit((i) => i - 1)
        }
      })
      .then(() => {
        if (!error && credit) {
          updateCredits()
        }
      })
      .then(() => {
        if (credit) {
          router.push({
            pathname: '/result',
            query: {
              location: country.name,
              keyword: keyword,
              credit: credit - 1,
            },
          })
        }
      })
    // updateCredits()
    // setCredit((i) => i - 1)
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
            credits={credit}
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
