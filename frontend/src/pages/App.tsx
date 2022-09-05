import '@/styles/App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'


import Layout from '@/components/config/Layout'
import { PrivatedRoutes, PublicedRoute } from '@/helper/routes'
import { LoggedIn } from '@/state'
import { PrivateRoutes, PublicRoutes } from '@/routes/route'

function App() {
  const isLoggedIn = useRecoilValue(LoggedIn)

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Private routes */}
          <Route
            path='/'
            element={
              <PrivatedRoutes isLoggedIn={isLoggedIn}>
                <Layout />
              </PrivatedRoutes>
            }
          >
            {PrivateRoutes.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </Route>

          {/* Public routes */}
          <Route
            path='/'
            element={
              <PublicedRoute>
                 <Outlet />
              </PublicedRoute>
            }
          >
            {PublicRoutes.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </Route>

          <Route path={'/*'} element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
