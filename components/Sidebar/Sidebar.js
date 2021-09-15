import React from 'react'
import { Tab } from '@headlessui/react'
import { useSelector } from 'react-redux'
import Htag from './Htag'
import Overview from './Overview'
import Facts from './Facts'
import PeopleAsk from './PeopleAsk'
import Summary from './Summary'

function Sidebar() {
  const Htags = useSelector((state) => state.Htags)
  const { data, loading, error } = Htags

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className='w-[540px]'>
      <Tab.Group>
        <Tab.List className='flex gap-x-8 py-2 px-4 className="  p-1  bg-green-400 rounded-xl'>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Overview
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Htags
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Facts
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Questions
          </Tab>
          {/* <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'bg-white shadow'
                  : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Summaries
          </Tab> */}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className=' bg-white text-black  w-[540px] rounded-3xl '>
            <Overview data={data} />
          </Tab.Panel>
          <Tab.Panel className=' bg-white text-black h-[700px] overflow-scroll w-[540px] rounded-3xl py-2'>
            <div>
              <Htag data={data} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div>
              <Facts data={data} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div>
              <PeopleAsk data={data} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div>
              <Summary data={data} />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Sidebar
