import useAuth from '../../Context/Authentication/UseAuth'
import logo from '../../Assets/icons/logo.png'
import { useNavigate } from 'react-router-dom'

function Header() {
	const auth = useAuth()
	const navigate = useNavigate()

	return (
		<div className='bg-white w-full border-b border-slate-200 shadow-xl h-20'>
			<div className='px-3 sm:px-20 md:px-40 xl:px-96 py-3'>
				<div className='flex gap-10'>
					<img src={logo} className='w-28 h-14' alt='logo' />
					{auth.isAuthenticated ? (
						<div className='flex space-x-5 my-auto'>
							<p
								className='cursor-pointer hover:underline'
								onClick={() => navigate('/diaries')}
							>
								Diaries
							</p>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default Header
