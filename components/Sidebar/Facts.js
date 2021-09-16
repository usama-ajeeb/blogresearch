import React from 'react'

function Facts({ data, list, setList }) {
  console.log('people', data)
  var containsNumber = /\d+/
  var containCalled = /https/i
  var factss = []
  data.map(({ facts, url }) =>
    facts?.map((i) => {
      if (i.length > 120 && i.length < 600 && containCalled.test(i) == false) {
        if (containsNumber.test(i) === true) {
          factss.push(i)
        }
      }
    })
  )

  return (
    <div className='overflow-scroll  h-[690px]'>
      {factss?.map((i) => (
        <li
          onClick={() => setList(list.concat(i.slice(0, i.length)))}
          className='list-none py-2 border-t px-10 hover:text-gray-500 cursor-pointer'
        >
          {i}
        </li>
      ))}
    </div>
  )
}

export default Facts
