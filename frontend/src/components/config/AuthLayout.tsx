import { Navigate, Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'
import LeftMenu from './LeftMenu'

function AuthLayout() {
  const user = localStorage.getItem('user')
  console.log(1113, user);

  if (!user) {
    console.log('hitt3');
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-1/6 p-5 bg-slate-50">
          <LeftMenu />
        </div>
        <div className="w-full min-h-[80vh] p-12 ">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AuthLayout
