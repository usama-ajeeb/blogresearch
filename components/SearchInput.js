import React from 'react'

function SearchInput({ submitHandler, handleChange, keyword }) {
  return (
    <form action='' onSubmit={submitHandler}>
      <input type='text' value={keyword} onChange={handleChange} />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default SearchInput
