import React from 'react'

function PeopleAsk({ data }) {
  var containCalled = /\?/g
  var peo = []
  var result = data?.reduce((unique, o) => {
    if (!unique.some((obj) => obj.label === o.label && obj.value === o.value)) {
      unique.push(o)
    }
    return unique
  }, [])

  result?.map(({ peopleAsk }) =>
    peopleAsk?.map((i) => {
      if (containCalled.test(i) === true) {
        peo.push(i)
      }
    })
  )

  return (
    <div className=''>
      {peo?.map((i, index) => (
        <li key={index} className='border py-2 shadow-sm p-3 list-decimal'>
          {i}
        </li>
      ))}
    </div>
  )
}

export default PeopleAsk
