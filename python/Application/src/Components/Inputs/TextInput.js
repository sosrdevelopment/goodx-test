import { useCallback, useState } from 'react'

const TextInput = ({ className, onChange, placeholder, validation, value }) => {
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
				setBorderColor('shadow-md shadow-green-500')
			}
		},
		[validation, setBorderColor]
	)

	//	response
	return (
		<input
			className={`outline-none p-1.5 px-3 text-md text-gray-700 rounded border ${
				className || ''
			} ${borderColor}`}
			onBlur={(e) => isValid(e)}
			onChange={(e) => (onChange ? onChange(e) : null)}
			placeholder={placeholder ? placeholder : ''}
			type='text'
			value={value || ''}
		/>
	)
}

export default TextInput
