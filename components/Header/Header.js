import React from 'react'
import SearchInput from './SearchInput'
import { Nav } from './Nav'
import NoCredit from './NoCredit'

export const Header = ({
  country,
  setCountry,
  handleChange,
  submitHandler,
  keyword,
  loading,
  session,
  credits,
}) => {
  return (
    <div>
      <Nav session={session} credits={credits} />
      {Number(credits) > 0 ? (
        <SearchInput
          keyword={keyword}
          submitHandler={submitHandler}
          handleChange={handleChange}
          country={country}
          setCountry={setCountry}
          loading={loading}
        />
      ) : (
        <NoCredit />
      )}
    </div>
  )
}
