function Button({ children, className, noProp, onClick, padding, reference }) {
	return (
		<button
			className={`cursor-pointer ${
				padding || 'px-4 py-2'
			} rounded-lg w-auto ${className}`}
			onClick={(e) => {
				if (onClick) onClick(e)
				if (noProp) {
					e.stopPropagation()
					e.preventDefault()
				}
			}}
			ref={reference ? reference : null}
		>
			{children}
		</button>
	)
}

export default Button
