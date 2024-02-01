import { createContext } from 'react'

const AuthContext = createContext({
	isAuthenticated: null,
	user: null,
	signIn: null,
	signOut: null,
})

export default AuthContext
