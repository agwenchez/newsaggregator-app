import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateOutlet =()=> {
  const auth = useAuth()
  const location = useLocation()

  return auth.token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace={true} />
  )
}


export default PrivateOutlet