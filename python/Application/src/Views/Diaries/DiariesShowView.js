import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import ApiHelper from '../../Helpers/Apis/ApiHelper'
import Button from '../../Components/Buttons/Button'
import ResponsiveLoadingCard from '../../Components/Cards/ResponsiveLoadingCard'
import BookingsCreateModal from '../../Containers/Bookings/BookingsCreateModal'
import BookingsUpdateModal from '../../Containers/Bookings/BookingsUpdateModal'
import DiaryBookingsTab from '../../Containers/Diaries/DiaryBookingsTab'

function DiariesShowView() {
	//  Variables
	const { diary_uid } = useParams()
	const [createIsVisible, setCreateIsVisible] = useState(false)
	const [updateIsVisible, setUpdateIsVisible] = useState(false)
	const [updateBookingUid, setUpdateBookingUid] = useState(false)
	const [bookings, setBookings] = useState({
		Booked: [],
		Arrived: [],
		Done: [],
		Ready: [],
		Cancelled: [],
		Treated: [],
	})
	const [bookingTabsVisibility, setBookingTabsVisibility] = useState([
		true,
		false,
		false,
		false,
		false,
		false,
	])

	//  Queries
	const { data, isLoading, error, refetch } = useQuery(
		['diaryBookings', diary_uid],
		() => ApiHelper.indexBookings(diary_uid),
		{
			refetchOnWindowFocus: false,
			refetchInterval: 300000,
			retryDelay: 2000,
		}
	)

	//  Functionality
	useEffect(() => {
		if (error || isLoading) return

		setBookings({
			Booked: data.data.filter((booking) => booking.booking_status === 'Booked' && booking.cancelled === false),
			Arrived: data.data.filter((booking) => booking.booking_status === 'Arrived' && booking.cancelled === false),
			Done: data.data.filter((booking) => booking.booking_status === 'Done' && booking.cancelled === false),
			Ready: data.data.filter((booking) => booking.booking_status === 'Ready' && booking.cancelled === false),
			Cancelled: data.data.filter((booking) => booking.cancelled === true),
			Treated: data.data.filter((booking) => booking.booking_status === 'Treated' && booking.cancelled === false),
		})
	}, [data, isLoading, error, setBookings])

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
				<div>
					<div className='flex space-x-3'>
						<button
							className={`hover:border-cyan-300  px-3 py-1.5 rounded-t-lg ${
								bookingTabsVisibility[0] ? 'bg-white border-b-0' : 'border'
							}`}
							onClick={() =>
								setBookingTabsVisibility([true, false, false, false, false, false])
							}
						>
							Booked
						</button>
						<button
							className={`hover:border-cyan-300  px-3 py-1.5 rounded-t-lg ${
								bookingTabsVisibility[1] ? 'bg-white border-b-0' : 'border'
							}`}
							onClick={() =>
								setBookingTabsVisibility([false, true, false, false, false, false])
							}
						>
							Arrived
						</button>
						<button
							className={`hover:border-cyan-300  px-3 py-1.5 rounded-t-lg ${
								bookingTabsVisibility[3] ? 'bg-white border-b-0' : 'border'
							}`}
							onClick={() =>
								setBookingTabsVisibility([false, false, false, true, false, false])
							}
						>
							Ready
						</button>
						<button
							className={`hover:border-cyan-300  px-3 py-1.5 rounded-t-lg ${
								bookingTabsVisibility[2] ? 'bg-white border-b-0' : 'border'
							}`}
							onClick={() =>
								setBookingTabsVisibility([false, false, true, false, false, false])
							}
						>
							Done
						</button>
						<button
							className={`hover:border-cyan-300  px-3 py-1.5 rounded-t-lg ${
								bookingTabsVisibility[5] ? 'bg-white border-b-0' : 'border'
							}`}
							onClick={() =>
								setBookingTabsVisibility([false, false, false, false, false, true])
							}
						>
							Treated
						</button>
						<button
							className={`hover:border-cyan-300  px-3 py-1.5 rounded-t-lg ${
								bookingTabsVisibility[4] ? 'bg-white border-b-0' : 'border'
							}`}
							onClick={() =>
								setBookingTabsVisibility([false, false, false, false, true, false])
							}
						>
							Cancelled
						</button>
					</div>
					<div className='bg-white rounded-b-lg rounded-r-lg p-5 shadow-xl shadow-t-xl'>
						<DiaryBookingsTab
							isVisible={bookingTabsVisibility[0]}
							bookings={bookings.Booked}
							updateBooking={updateBooking}
						/>
						<DiaryBookingsTab
							isVisible={bookingTabsVisibility[1]}
							bookings={bookings.Arrived}
							updateBooking={updateBooking}
						/>
						<DiaryBookingsTab
							isVisible={bookingTabsVisibility[2]}
							bookings={bookings.Done}
							updateBooking={updateBooking}
						/>
						<DiaryBookingsTab
							isVisible={bookingTabsVisibility[3]}
							bookings={bookings.Ready}
							updateBooking={updateBooking}
						/>
						<DiaryBookingsTab
							isVisible={bookingTabsVisibility[5]}
							bookings={bookings.Treated}
							updateBooking={updateBooking}
						/>
						<DiaryBookingsTab
							isVisible={bookingTabsVisibility[4]}
							bookings={bookings.Cancelled}
							updateBooking={() => console.log('Cancelled')}
						/>
					</div>
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
