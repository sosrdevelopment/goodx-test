import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import ApiHelper from '../../Helpers/Apis/ApiHelper'
import Button from '../../Components/Buttons/Button'
import ResponsiveLoadingCard from '../../Components/Cards/ResponsiveLoadingCard'
import Card from '../../Components/Cards/Card'
import BookingsCreateModal from '../../Containers/Bookings/BookingsCreateModal'
import BookingsUpdateModal from '../../Containers/Bookings/BookingsUpdateModal'

function DiariesShowView() {
	//  Variables
	const currentDate = new Date()
	const nextWeek = new Date().setDate(currentDate.getDate() + 7)

	const { diary_uid } = useParams()
	const [createIsVisible, setCreateIsVisible] = useState(false)
	const [updateIsVisible, setUpdateIsVisible] = useState(false)
	const [updateBookingUid, setUpdateBookingUid] = useState(false)

	//  Queries
	const { data, isLoading, error, refetch } = useQuery(
		['diaryBookings', diary_uid],
		() => ApiHelper.indexBookings(diary_uid),
		{
			refetchOnWindowFocus: false,
			refetchInterval: 60000,
			retryDelay: 2000,
		}
	)

	//  Functionality
	const updateBooking = useCallback(
		(booking_uid) => {
			setUpdateBookingUid(booking_uid)
			setUpdateIsVisible(true)
		},
		[setUpdateIsVisible, setUpdateBookingUid]
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
		<div className='w-full'>
			<div className=' space-y-5'>
				<div className='flex justify-between'>
					<p className='text-lg font-medium my-auto'>Diary Bookings</p>
					<Button
						className='bg-white border hover:border-cyan-300 shadow hover:shadow-lg'
						onClick={() => setCreateIsVisible(true)}
					>
						+ Create Booking
					</Button>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-4 mb-auto'>
					{data.data
						.map((booking) => {
							return {
								...booking,
								start_date_time:
									booking.start_time == null ? null : new Date(booking.start_time),
							}
						})
						.sort((a, b) => a.start_date_time - b.start_date_time)
						.map((booking) => {
							var urgency = 'hover:border-teal-300'
							if (booking.booking_status == 'Done') {
								urgency = 'shadow-green-300 hover:border-green-400'
							} else if (booking.start_date_time < currentDate) {
								urgency = 'shadow-rose-300 hover:border-rose-400'
							} else if (booking.start_date_time < nextWeek) {
								urgency = 'shadow-amber-300 hover:border-amber-400'
							}
							return (
								<div key={booking.uid} onClick={() => updateBooking(booking.uid)}>
									<Card
										outerClass={`mb-auto cursor-pointer rounded-lg border h-full `}
										shadow={`shadow-lg ${urgency}`}
										innerClass='space-y-1'
									>
										<p className='text-lg font-bold text-center pb-1'>
											{booking.invoice_nr}
										</p>
										<div className='flex space-x-3'>
											<label className='text-sm'>Start Time:</label>
											{booking.start_time ? (
												<p className='text-sm'>
													{new Date(booking.start_time).toLocaleString()}
												</p>
											) : (
												<p className='text-sm'>---</p>
											)}
										</div>
										<div className='flex space-x-3'>
											<label className='text-sm'>Doctor:</label>
											{booking.treating_doctor_uid ? (
												<p className='text-sm'>{booking.treating_doctor_uid}</p>
											) : (
												<p className='text-sm'>---</p>
											)}
										</div>
										<div className='border-t border-slate-300'></div>
										<div className='flex space-x-3'>
											<label className='text-sm'>Type:</label>
											{booking.booking_type ? (
												<p className='text-sm'>{booking.booking_type}</p>
											) : (
												<p className='text-sm'>---</p>
											)}
										</div>
										<div className='flex space-x-3'>
											<label className='text-sm'>Status:</label>
											{booking.booking_status ? (
												<p className='text-sm'>{booking.booking_status}</p>
											) : (
												<p className='text-sm'>---</p>
											)}
										</div>
										<div className='flex space-x-3'>
											<label className='text-sm'>Reason:</label>
											{booking.reason ? (
												<p className='text-sm'>{booking.reason}</p>
											) : (
												<p className='text-sm'>---</p>
											)}
										</div>
										<div className='border-t border-slate-300'></div>
										{booking.debtor_name ? (
											<div className='flex space-x-3'>
												<label className='text-sm'>Debtor:</label>
												<p className='text-sm'>
													{booking.debtor_name} {booking.debtor_surname}
												</p>
											</div>
										) : null}
										{booking.patient_name ? (
											<div className='flex space-x-3'>
												<label className='text-sm'>Patient:</label>
												<p className='text-sm'>
													{booking.patient_name} {booking.patient_surname}
												</p>
											</div>
										) : null}
									</Card>
								</div>
							)
						})}
				</div>
			</div>
			<BookingsCreateModal
				isVisible={createIsVisible}
				setIsVisible={setCreateIsVisible}
				diary_uid={diary_uid}
				reload={refetch}
			/>
			<BookingsUpdateModal
				isVisible={updateIsVisible}
				setIsVisible={setUpdateIsVisible}
				booking_uid={updateBookingUid}
				reload={refetch}
			/>
		</div>
	)
}

export default DiariesShowView
