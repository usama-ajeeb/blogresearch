import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HtagsAction } from '../redux/actions'
import { Header } from '../components/Header/Header'
import { countries } from '../Data/countries'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')
  const [country, setCountry] = useState(countries[0])

  const Htags = useSelector((state) => state.Htags)
  const { loading, error } = Htags

  const handleChange = useCallback(
    (e) => {
      setKeyword(e.target.value)
    },
    [setKeyword]
  )
  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(HtagsAction(keyword, country)).then(() =>
      router.push({
        pathname: '/result',
        query: {
          location: country.name,
          keyword: keyword,
        },
      })
    )
  }

  return (
    <div className='bg-gray-50 h-screen'>
      <Head>
        <title>Blog Research</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <Header
          handleChange={handleChange}
          submitHandler={submitHandler}
          keyword={keyword}
          country={country}
          setCountry={setCountry}
          loading={loading}
        />
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
