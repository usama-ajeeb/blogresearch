import React, { Fragment, useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { countries } from '../../Data/countries'

function SearchInput({
  handleChange,
  submitHandler,
  keyword,
  country,
  setCountry,
  loading,
}) {
  return (
    <form
      action=''
      onSubmit={submitHandler}
      className='flex items-center mt-10  border-gray-300 border shadow-md py-3 bg-white w-[500px] md:w-[650px]  rounded-full px-5 mx-auto gap-x-2'
    >
      <SearchIcon className='h-6 text-gray-400' />
      <input
        className='flex-grow outline-none text-gray-700'
        type='text'
        placeholder='keyword....'
        value={keyword}
        onChange={handleChange}
      />
      <div className=' w-40'>
        <Listbox value={country} onChange={setCountry}>
          <div className='relative mt-1'>
            <Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm'>
              <span className='block truncate'>{country.name}</span>
              <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <SelectorIcon
                  className='w-5 h-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {countries.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `${
                        active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                      }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={person}
                  >
                    {({ country, active }) => (
                      <>
                        <span
                          className={`${
                            country ? 'font-medium' : 'font-normal'
                          } block truncate`}
                        >
                          {person.name}
                        </span>
                        {country ? (
                          <span
                            className={`${
                              active ? 'text-amber-600' : 'text-amber-600'
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className='w-5 h-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <button
        disabled={loading}
        className={`${
          loading ? `bg-gray-700` : `bg-green-400`
        } font-bold hover:bg-green-300 active:scale-95 py-2 px-4 rounded-full text-white`}
        type='submit'
      >
        {loading ? `Loading` : 'Search'}
      </button>
    </form>
  )
}

export default SearchInput
