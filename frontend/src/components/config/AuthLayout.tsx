import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import ScrollToTop from '../atoms/Button/ScrollToTop'

import Footer from './Footer'
import Header from './Header'
import LeftMenu from './LeftMenu'

function AuthLayout() {
  const user = localStorage.getItem('user')
  const [showButton, setShowButton] = useState(false)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    })
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
        {/* <ScrollToTop /> */}

        {showButton && (
          <div className="fixed bottom-50 bottom-10 right-10">
            <button
              onClick={scrollToTop}
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="none animate-bounce opacity-90 inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out bottom-5 right-5"
              id="btn_back_to_top"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                className="w-4 h-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default AuthLayout
