import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
	return (
		<div className='flex flex-col bg-slate-100'>
			<div className='flex flex-col min-h-screen'>
				<Header />
				<div className='flex-grow px-3 sm:px-20 md:px-40 xl:px-96 py-7 flex'>
					{children}
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Layout
