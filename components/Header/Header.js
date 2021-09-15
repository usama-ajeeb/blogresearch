import React from 'react'
import SearchInput from './SearchInput'
import { Nav } from './Nav'

export const Header = ({
  country,
  setCountry,
  handleChange,
  submitHandler,
  keyword,
  loading,
}) => {
  return (
    <div>
      <Nav />
      <SearchInput
        keyword={keyword}
        submitHandler={submitHandler}
        handleChange={handleChange}
        country={country}
        setCountry={setCountry}
        loading={loading}
      />
    </div>
  )
}
