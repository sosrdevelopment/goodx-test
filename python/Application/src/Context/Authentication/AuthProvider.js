import React, { useCallback, useEffect, useState } from 'react'
import ApiHelper from '../../Helpers/Apis/ApiHelper'
import AuthContext from './AuthContext'

const AuthProvider = ({ children }) => {
	//  --- variables ---
	let [user, setUser] = useState(null)
	let [isAuthenticated, setIsAuthenticated] = useState(false)

	//	setup
	useEffect(() => {
		var sessionUser = localStorage.getItem('sessionUser')
		if (sessionUser) {
			setUser(sessionUser)
			setIsAuthenticated(true)
		} else {
			setUser(null)
			setIsAuthenticated(false)
		}
	}, [setUser, setIsAuthenticated])

	//  --- functionality ---
	const signIn = useCallback(
		async (username, password, successCallback, errorCallback) => {
			await ApiHelper.loginUser({
				username: username,
				password: password,
			})
				.then((response) => {
					setUser(response)
					setIsAuthenticated(true)
					localStorage.setItem('sessionUser', JSON.stringify(response))
					if (successCallback) successCallback()
				})
				.catch(() => {
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
