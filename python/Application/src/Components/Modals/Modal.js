const Modal = ({ children, isVisible, setIsVisible }) => {
	//	--- response ---
	if (!isVisible) return null
	return (
		<div
			className={`h-screen w-screen fixed top-0 left-0 z-10 cursor-default bg-opacity-50 bg-white`}
			onClick={(e) => {
				e.preventDefault()
				e.stopPropagation()

				if (setIsVisible) setIsVisible(false)
			}}
		>
			<div className='w-full h-full flex z-50'>{children}</div>
		</div>
	)
}

export default Modal
