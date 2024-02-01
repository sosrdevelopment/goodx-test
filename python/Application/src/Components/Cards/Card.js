const Card = ({ children, innerClass, outerClass, padding }) => {
	return (
		<div
			className={`bg-white md:rounded-lg md:shadow-xl ${
				padding || 'p-5'
			} ${outerClass || ''}`}
		>
			<div className={innerClass}>{children}</div>
		</div>
	)
}

export default Card
