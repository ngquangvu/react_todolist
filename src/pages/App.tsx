import '@/styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './dashboard'
import ErrorPage from './error'
import Login from './login'
import UserProfile from './user'

import Layout from '@/components/config/Layout'
import CreateTodo from '@/components/templates/CreateTodo'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard/todo/list" element={<Dashboard />} />
            <Route path="/dashboard/todo/add" element={<CreateTodo />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <Header />
      <main className="flex justify-center items-center w-full h-full min-h-full p-14"></main>
      <Footer /> */}
    </>
  )
}

export default App
