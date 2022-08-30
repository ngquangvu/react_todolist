import { NavLink } from 'react-router-dom'

import { Icon } from '../atoms/Icon'

const Header = () => {
  const headerIco = 'https://cdn-icons-png.flaticon.com/512/3472/3472580.png'

  return (
    <div className="flex justify-between z-50 items-center h-20 bg-white px-4 py-4 shadow-md shadow-slate-900/5 sticky top-0">
      <div className="h-full">
        <NavLink to="/">
          <Icon url={headerIco} alt="header-icon" />
        </NavLink>
      </div>
      <div className="h-full flex items-center">
        <svg className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </div>
    </div>
  )
}

export default Header
