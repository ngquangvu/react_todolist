import { axiosTemplate } from '@/helper/axios'
import { LoggedIn } from '@/state'
import { UserInfo } from '@/types'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { Icon } from '../atoms/Icon'

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
  },[])

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
      <div className="h-full flex items-center">
        {isLoggedIn && (
          <>
          <span className='mr-4 text-md text-blue-900' >{user?.name}</span>
          <button type="button" className="mr-5 button button-icon button-pink" onClick={Logout}>
            <svg
              className="h-8 w-8 text-blue-600 opacity-90"
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
        {/* <svg className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg> */}
      </div>
    </div>
  )
}

export default Header
