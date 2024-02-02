import RingLoader from 'react-spinners/RingLoader'
import LoadingCard from './LoadingCard'

const ResponsiveLoadingCard = ({ isHalf, noBackground, title }) => {
	return (
		<LoadingCard
			noBackground={noBackground}
			innerClass='flex flex-col h-full w-full space-y-5'
			outerClass={`w-auto h-auto mx-5 mt-5 md:mx-0 md:mt-0 ${
				isHalf ? 'md:w-1/2' : 'md:w-full'
			}`}
			type='square'
		>
			<p className='text-center text-lg font-bold'>{title}</p>
			<div className='mx-auto h-full flex flex-col flex-grow justify-center'>
				<div className='w-16 h-16'>
					<RingLoader
						color={noBackground ? '#0258c9' : '#028acf'}
						loading={true}
						size={63.99}
						css='opacity: 1;'
					/>
				</div>
			</div>
		</LoadingCard>
	)
}

export default ResponsiveLoadingCard
