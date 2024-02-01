//  --- Imports : React and Routing
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//  --- Imports : Views
import BookingsIndexView from './Views/Bookings/BookingsIndexView'
import DiariesIndexView from './Views/Diaries/DiariesIndexView'
import UsersLogInView from './Views/Users/UsersLogInView'
//  --- Imports : Context
import ProtectedRoute from './Context/Authentication/ProtectedRoute'
//  --- Imports : Containers
import Layout from './Containers/Layout/Layout'
//  --- Imports : Libraries
import toastr from 'toastr'
//  --- Imports : Assets
import './Assets/css/index.css'
import './Assets/css/scrollbar.css'

//  --- Main Application
function App() {
	//	setup
	useEffect(() => {
		toastr.options = {
			closeButton: true,
			newestOnTop: true,
			progressBar: true,
			positionClass: 'toast-top-center',
			showDuration: '300',
			hideDuration: '300',
			timeOut: '2000',
			extendedTimeOut: '750',
			showEasing: 'swing',
			hideEasing: 'swing',
			showMethod: 'fadeIn',
			hideMethod: 'fadeOut',
		}
	}, [])

	// response
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route index path='/' element={<UsersLogInView />} />
					<Route
						path='/bookings'
						element={
							<ProtectedRoute>
								<BookingsIndexView />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/diaries'
						element={
							<ProtectedRoute>
								<DiariesIndexView />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}

//  --- Render Application
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
