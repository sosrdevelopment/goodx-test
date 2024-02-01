import useAuth from '../../Context/Authentication/UseAuth'
import logo from '../../Assets/icons/logo.png'
import menuIcon from '../../Assets/icons/menu.svg'

function Header() {
	const auth = useAuth()

	return (
		<div className='bg-white w-full border-b border-slate-200 shadow-xl h-20'>
			<div className='px-3 sm:px-20 md:px-40 xl:px-96 py-3'>
				<div className='flex gap-3'>
					{auth.isAuthenticated ? (
						<img src={menuIcon} className='my-auto h-6 w-6 cursor-pointer' alt='menu' />
					) : null}
					<img src={logo} className='w-28 h-14' alt='logo' />
				</div>
			</div>
		</div>
	)
}

export default Header
