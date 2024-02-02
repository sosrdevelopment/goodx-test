import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../Components/Buttons/Button'
import Card from '../../Components/Cards/Card'
import PasswordInput from '../../Components/Inputs/PasswordInput'
import TextInput from '../../Components/Inputs/TextInput'
import useAuth from '../../Context/Authentication/UseAuth'
import { toast } from 'react-toastify'

function UsersLogInView() {
	//	variables
	const auth = useAuth()
	const navigate = useNavigate()
	let [username, setUsername] = useState()
	let [password, setPassword] = useState()
	let [usernameIsValid, setUsernameIsValid] = useState(false)
	let [passwordIsValid, setPasswordIsValid] = useState(false)

	//	functionality
	const isValidUsername = useCallback(
		(e) => {
			if (e.length < 3) {
				setUsernameIsValid(false)
				return false
			} else {
				setUsernameIsValid(true)
				return true
			}
		},
		[setUsernameIsValid]
	)

	const isValidPassword = useCallback(
		(e) => {
			if (e.length < 6) {
				setPasswordIsValid(false)
				return false
			} else {
				setPasswordIsValid(true)
				return true
			}
		},
		[setPasswordIsValid]
	)

	const signIn = useCallback(() => {
		if (!isValidUsername(username))
			return toast('Username is not valid', { type: 'error' })
		if (!isValidPassword(password))
			return toast('Password is not valid', { type: 'error' })

		auth.signIn(
			username,
			password,
			() => {
				navigate('/diaries')
				toast('Welcome back!', { type: 'success' })
			},
			() => toast('Invalid username or password', { type: 'error' })
		)
	}, [
		username,
		password,
		usernameIsValid,
		passwordIsValid,
		isValidUsername,
		isValidPassword,
	])

	//	response
	return (
		<div className='m-auto'>
			<Card innerClass={'flex flex-col gap-5'}>
				<div className='flex flex-col gap-1'>
					<label>Username</label>
					<TextInput
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						validation={isValidUsername}
						placeholder={'Username'}
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label>Password</label>
					<PasswordInput
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						validation={isValidPassword}
					/>
				</div>
				<Button className='border hover:border-cyan-400 shadow-lg mt-2' onClick={signIn}>
					<p>Login</p>
				</Button>
			</Card>
		</div>
	)
}

export default UsersLogInView
