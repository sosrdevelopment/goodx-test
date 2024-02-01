import React, { useCallback, useState } from 'react'
import { AuthContext } from '../'
import toastr from 'toastr'
import ApiHelper from '../../helpers/ApiHelper'

const AuthProvider = ({ children }) => {
	//  --- variables ---
	let sessionUser = JSON.parse(localStorage.getItem('sessionUser'))
	let [user, setUser] = useState(sessionUser ? sessionUser : null)
	let [isAuthenticated, setIsAuthenticated] = useState(sessionUser ? true : false)

	//  --- functionality ---
	const signIn = useCallback(
		async (username, password, successCallback, errorCallback) => {
			await ApiHelper.loginUser({
				email: username,
				password: password,
			})
				.then((response) => {
					setUser(response)
					setIsAuthenticated(true)
					localStorage.setItem('sessionUser', JSON.stringify(response))
					if (successCallback) successCallback()
				})
				.catch(() => {
					toastr.error('Could not authenticate.')
					if (errorCallback) errorCallback()
				})
		},
		[]
	)

	const signOut = useCallback((callback) => {
		setUser(null)
		setIsAuthenticated(false)
		localStorage.removeItem('sessionUser')
		if (callback) callback()
	}, [])

	//  --- response ---
	return (
		<AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
