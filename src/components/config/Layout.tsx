import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import LeftMenu from './LeftMenu'

import Dashboard from '@/pages/dashboard'

function Layout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-1/6 p-5 bg-slate-50">
          <LeftMenu />
        </div>
        <div className="w-full min-h-[80vh] p-12 ">
          {/* <Dashboard /> */}
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
