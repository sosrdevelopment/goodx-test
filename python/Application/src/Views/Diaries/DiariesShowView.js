import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import ApiHelper from '../../Helpers/Apis/ApiHelper'
import ResponsiveLoadingCard from '../../Components/Cards/ResponsiveLoadingCard'
import Card from '../../Components/Cards/Card'

function DiariesShowView() {
	//  Variables
	const { diary_uid } = useParams()

	//  Queries
	const { data, isLoading, error } = useQuery(['diaryBookings', diary_uid], () =>
		ApiHelper.indexBookings(diary_uid)
	)

	//  Response
	if (error) return null
	if (isLoading)
		return (
			<div className='m-auto'>
				<ResponsiveLoadingCard
					title='Loading Diaries. Please wait...'
					noBackground={true}
				/>
			</div>
		)

	return (
		<div className='w-full space-y-5'>
			<p className='text-lg font-medium'>Diaries</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-4'>
				{data.data.map((booking) => {
					console.log(booking)
					return (
						<div onClick={() => alert('/diaries/' + booking.uid)}>
							<Card
								key={booking.uid}
								outerClass='mb-auto cursor-pointer rounded-lg shadow-lg border hover:border-teal-300'
								innerClass='space-y-1'
							>
								<p className='text-lg font-bold text-center pb-1'>{booking.invoice_nr}</p>
								{booking.description ? (
									<div className='flex space-x-3'>
										<label className='text-sm'>Description</label>
										<p className='text-sm'>{booking.description}</p>
									</div>
								) : null}
								{booking.debtor_name ? (
									<div className='flex space-x-3'>
										<label className='text-sm'>Debtor:</label>
										<p className='text-sm'>
											{booking.debtor_name} {booking.debtor_surname}
										</p>
									</div>
								) : null}
							</Card>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default DiariesShowView
