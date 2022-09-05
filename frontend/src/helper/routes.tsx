import { Navigate } from 'react-router-dom'

export const PrivatedRoutes = ({ isLoggedIn, children }: any) => {
  return !isLoggedIn ? <Navigate to="/login" replace /> : <>{children}</>
}

export const PublicedRoute  = ({ children }: any) => {
  return <>{children}</>
}
