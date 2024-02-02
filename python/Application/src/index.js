//  --- Imports : React and Routing
import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
//  --- Imports : Views
import BookingsIndexView from './Views/Bookings/BookingsIndexView'
import DiariesIndexView from './Views/Diaries/DiariesIndexView'
import DiariesShowView from './Views/Diaries/DiariesShowView'
import UsersLogInView from './Views/Users/UsersLogInView'
//  --- Imports : Context
import ProtectedRoute from './Context/Authentication/ProtectedRoute'
//  --- Imports : Containers
import Layout from './Containers/Layout/Layout'
//  --- Imports : Libraries
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//  --- Imports : Assets
import './Assets/css/index.css'
import './Assets/css/scrollbar.css'
import AuthProvider from './Context/Authentication/AuthProvider'

//  --- Main Application
function App() {
	const queryClient = useMemo(() => {
		return new QueryClient()
	}, [])

	return (
		<BrowserRouter>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<Layout>
						<ToastContainer />
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
							<Route
								path='/diaries/:diary_uid'
								element={
									<ProtectedRoute>
										<DiariesShowView />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</Layout>
				</QueryClientProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

//  --- Render Application
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
