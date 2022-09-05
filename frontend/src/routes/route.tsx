import Dashboard from '@/pages/dashboard'
import Error from '@/pages/error'
import Login from '@/pages/login'
import Regist from '@/pages/regist'
import CreateTodo from '@/pages/todo/create'
import UserProfile from '@/pages/user'

export const PublicRoutes = [
  {
    path: '/regist',
    element: <Regist />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Error />
  },
]

export const PrivateRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/dashboard/todo/list',
    element: <Dashboard />
  },
  {
    path: '/dashboard/todo/add',
    element: <CreateTodo />
  },
  {
    path: '/user',
    element: <UserProfile />
  },
]
