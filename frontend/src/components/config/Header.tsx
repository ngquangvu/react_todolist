import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useRecoilState } from 'recoil'

import { Icon } from '../atoms/Icon'

import type { UserInfo } from '@/types'

import { axiosTemplate } from '@/helper/axios'
import { LoggedIn } from '@/state'

const Header = () => {
  const headerIco = 'https://cdn-icons-png.flaticon.com/512/3472/3472580.png'
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedIn)
  const [user, setUser] = useState<UserInfo | null>(null)

  const getUserName = () => {
    const localStorageUser = localStorage.getItem('user')
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser))
    }
  }

  useEffect(() => {
    getUserName()
  }, [])

  const Logout = () => {
    axiosTemplate.post('/api/logout')

    // success
    setLoggedIn(false)
    localStorage.removeItem('user')
  }

  return (
    <div className="flex justify-between z-50 items-center h-20 bg-white px-4 py-4 shadow-md shadow-slate-900/5 sticky top-0">
      <div className="h-full">
        <NavLink to="/">
          <Icon url={headerIco} alt="header-icon" />
        </NavLink>
      </div>

      <div className="flex justify-center">
        <div className="xl:w-96">
          <div className="input-group relative flex flex-row items-stretch w-full">
            <input
              type="search"
              className="form-control relative rounded-l-md flex-auto min-w-full block w-full px-3 py-1.5 text-base font-normal shadow-xs text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <button
              className="btn px-6 py-2.5 rounded-r-md bg-gray-300 text-white font-medium text-xs leading-tight uppercase shadow-xs hover:bg-gray-400 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-500 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="h-full flex items-center">
        {isLoggedIn && (
          <>
            <span className="mr-4 text-md text-blue-900">
              {(user?.first_name ? user?.first_name : '') + ' ' + (user?.last_name ? user?.last_name : '')}
            </span>
            <button type="button" className="mr-5 button button-icon button-pink" onClick={Logout}>
              <svg
                className="h-8 w-8 text-blue-600 opacity-80"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {' '}
                <path stroke="none" d="M0 0h24v24H0z" />{' '}
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{' '}
                <path d="M7 12h14l-3 -3m0 6l3 -3" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
