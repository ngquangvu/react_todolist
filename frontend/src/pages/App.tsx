import '@/styles/App.css'
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query'

import AuthLayout from '@/components/config/AuthLayout'
import { PrivatedRoutes, PublicedRoute } from '@/helper/routes'
import { PrivateRoutes, PublicRoutes } from '@/routes/route'
import { useRecoilState } from 'recoil'
import { LoggedIn } from '@/state'

function App() {
  const queryClient = new QueryClient()
  const user = localStorage.getItem('user')
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedIn)

  setLoggedIn(true)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Private routes */}
            <Route
              path="/"
              element={
                <PrivatedRoutes isLoggedIn={isLoggedIn}>
                  <AuthLayout />
                </PrivatedRoutes>
              }
            >
              {PrivateRoutes.map((item, index) => (
                <Route key={index} path={item.path} element={item.element} />
              ))}
            </Route>

            {/* Public routes */}
            <Route
              path="/"
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

            {/* <Route path={'/*'} element={<Navigate to="/" />} /> */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
