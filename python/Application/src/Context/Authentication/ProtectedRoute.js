import { Navigate, useLocation } from 'react-router-dom'
import useAuth from './UseAuth'

const ProtectedRoute = ({ children }) => {
	//  --- variables ---
	let auth = useAuth()
	let location = useLocation()

	//	--- response ---
	if (auth.isAuthenticated) return children
	return <Navigate to='/' state={{ from: location }} />
}

export default ProtectedRoute
