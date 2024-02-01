import { useCallback, useState } from 'react'
import { isValidPassword } from '../../Helpers/InputValidationHelper'

const PasswordInput = ({ className, onChange, placeholder, validation, value }) => {
	//	variables
	let [borderColor, setBorderColor] = useState('')

	//	functionality
	const isValid = useCallback(
		(e) => {
			if (validation) {
				if (!validation(e.target.value)) {
					setBorderColor('shadow-md shadow-red-500')
				} else {
					setBorderColor('shadow-md shadow-green-500')
				}
			} else {
				if (!isValidPassword(e.target.value)) {
					setBorderColor('shadow-md shadow-red-500')
				} else {
					setBorderColor('shadow-md shadow-green-500')
				}
			}
		},
		[validation, setBorderColor]
	)

	//	response
	return (
		<input
			className={`p-1.5 px-3 text-md text-gray-700 rounded border outline-none ${
				className || ''
			} ${borderColor}`}
			onBlur={(e) => isValid(e)}
			onChange={(e) => (onChange ? onChange(e) : null)}
			placeholder={placeholder ? placeholder : 'Password'}
			type='password'
			value={value || ''}
		/>
	)
}

export default PasswordInput
