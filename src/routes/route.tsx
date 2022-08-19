import Dashboard from '@/pages/dashboard'
import Error from '@/pages/error'
import Login from '@/pages/login'

export const CommonRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/error',
    element: <Error />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
]

// export const AdminRoutes = [
//   {
//     path: '/dashboard',
//     element: <Dashboard />
//   }
// ]
