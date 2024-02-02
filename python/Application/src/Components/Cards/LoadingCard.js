import { useMemo } from 'react'

const LoadingCard = ({
	children,
	innerClass,
	noBackground,
	outerClass,
	outerStyle,
	type,
}) => {
	//	--- setup ---
	const rounded = useMemo(() => {
		switch (type) {
			case 'circle':
				return 'rounded-full'
			case 'square':
				return 'rounded-lg'
			default:
				return type || ''
		}
	}, [type])

	//	--- response ---
	return (
		<div
			className={`p-5 ${!noBackground ? 'bg-white animate-pulse md:shadow-xl' : ''} ${outerClass || ''} ${rounded || ''}`}
			style={outerStyle}
		>
			<div className={innerClass}>{children}</div>
		</div>
	)
}

export default LoadingCard
