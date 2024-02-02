const Card = ({ children, innerClass, outerClass, padding, shadow }) => {
	return (
		<div
			className={`bg-white md:rounded-lg ${
				padding || 'p-5'
			} ${outerClass || ''} ${shadow || 'md:shadow-xl'}`}
		>
			<div className={innerClass}>{children}</div>
		</div>
	)
}

export default Card
