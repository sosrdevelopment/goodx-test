import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
	return (
		<div className='flex flex-col bg-slate-100'>
			<div className='h-screen'>
				<Header />
				<div className='flex-grow'>{children}</div>
			</div>
			<Footer />
		</div>
	)
}

export default Layout
