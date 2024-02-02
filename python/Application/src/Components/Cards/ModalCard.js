const ModalCard = ({ children, innerClass, onClick, outerClass }) => {
	return (
		<div
			className={`rounded-lg shadow-xl bg-white ${outerClass || ''}`}
			onClick={onClick ? onClick : null}
		>
			<div className={innerClass}>{children}</div>
		</div>
	)
}

export default ModalCard
