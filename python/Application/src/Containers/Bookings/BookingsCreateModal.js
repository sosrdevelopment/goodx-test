import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import ModalCard from '../../Components/Cards/ModalCard'
import Modal from '../../Components/Modals/Modal'
import ApiHelper from '../../Helpers/Apis/ApiHelper'
import ResponsiveLoadingCard from '../../Components/Cards/ResponsiveLoadingCard'

function BookingsCreateModal({ isVisible, setIsVisible, diary_uid, reload }) {
	//  Variables
	const [initialized, setInitialized] = useState(false)
	const [bookingTypes, setBookingTypes] = useState(false)
	const [bookingStatuses, setBookingStatuses] = useState(false)
	const [patients, setPatients] = useState(false)
	const [booking, setBooking] = useState(
		{
			diary_uid: diary_uid,
			patient_uid: '',
			booking_type_uid: '',
			booking_status_uid: '',
			start_time: new Date().toISOString().split('.')[0].split(':')[0] + ':00:00',
			duration: 15,
			reason: '',
		},
		[diary_uid]
	)

	//  Functionality : Booking
	const createBooking = useCallback(() => {
		if (booking.patient_uid === '') return toast('Please select a patient')
		if (booking.booking_type_uid === '') return toast('Please select a booking type')
		if (booking.booking_status_uid === '') return toast('Please select a booking status')
		if (booking.start_time === '') return toast('Please select a start time')
		if (booking.duration === '') return toast('Please select a duration')

		ApiHelper.createBooking(booking)
			.then(() => {
				if (reload) reload()
				setIsVisible(false)
				toast('Diary created!', { type: 'success' })
				resetBooking()
			})
			.catch((error) => {
				if (error.message) toast(error.message, { type: 'error' })
			})
	}, [booking, setIsVisible, diary_uid, reload])

	const resetBooking = useCallback(() => {
		setBooking({
			diary_uid: diary_uid,
			patient_uid: '',
			booking_type_uid: '',
			booking_status_uid: '',
			start_time: new Date().toISOString().split('.')[0].split(':')[0] + ':00:00',
			duration: 15,
			reason: '',
		})
	}, [setBooking])

	//  Functionality : Modal
	const initializeModal = useCallback(() => {
		setInitialized(true)
		ApiHelper.indexBookingTypes().then((response) =>
			setBookingTypes(response.data.sort((a, b) => a.name.localeCompare(b.name)))
		)
		ApiHelper.indexBookingStatuses().then((response) =>
			setBookingStatuses(response.data.sort((a, b) => a.name.localeCompare(b.name)))
		)
		ApiHelper.indexPatients().then((response) =>
			setPatients(response.data.sort((a, b) => a.name.localeCompare(b.name)))
		)
	}, [setInitialized, setBookingTypes, setBookingStatuses, setPatients])

	const closeModal = useCallback(() => {
		resetBooking()
		if (isVisible) setIsVisible(false)
	}, [resetBooking, isVisible, setIsVisible])

	//  Response
	if (!isVisible) return null
	if (!initialized) initializeModal()

	return (
		<Modal isVisible={isVisible} setIsVisible={setIsVisible} closeCallback={resetBooking}>
			<ModalCard outerClass='m-auto border' innerClass='flex flex-col'>
				<div
					className='w-[400px]'
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
					}}
				>
					<div className='border-b border-slate-200 px-5 py-2'>
						<p className='text-md font-medium'>Create Booking</p>
					</div>
					{!bookingTypes || !bookingStatuses || !patients ? (
						<ResponsiveLoadingCard title={'Loading Data...'} noBackground={true} />
					) : (
						<div className='p-5 space-y-4'>
							<div className='flex flex-col gap-1'>
								<label>Patient</label>
								<select
									value={booking.patient_uid}
									onChange={(e) =>
										setBooking({ ...booking, patient_uid: e.target.value })
									}
									className='bg-white px-3 py-1.5 border border-slate-200 rounded-md outline-none cursor-pointer hover:border-cyan-300 font-normal'
								>
									<option key='default' disabled value=''>
										Select A Patient...
									</option>
									{patients.map((patient) => {
										return (
											<option key={patient.uid} value={patient.uid}>
												{patient.name}
											</option>
										)
									})}
								</select>
							</div>
							<div className='flex flex-col gap-1'>
								<label>Booking Type</label>
								<select
									value={booking.booking_type_uid}
									onChange={(e) =>
										setBooking({ ...booking, booking_type_uid: e.target.value })
									}
									className='bg-white px-3 py-1.5 border border-slate-200 rounded-md outline-none cursor-pointer hover:border-cyan-300'
								>
									<option key='default' disabled value=''>
										Select A Booking Type...
									</option>
									{bookingTypes.map((bookingType) => {
										return (
											<option key={bookingType.uid} value={bookingType.uid}>
												{bookingType.name}
											</option>
										)
									})}
								</select>
							</div>
							<div className='flex flex-col gap-1'>
								<label>Booking Status</label>
								<select
									value={booking.booking_status_uid}
									onChange={(e) =>
										setBooking({ ...booking, booking_status_uid: e.target.value })
									}
									className='bg-white px-3 py-1.5 border border-slate-200 rounded-md outline-none cursor-pointer hover:border-cyan-300'
								>
									<option key='default' disabled value=''>
										Select A Booking Status...
									</option>
									{bookingStatuses.map((bookingStatus) => {
										return (
											<option key={bookingStatus.uid} value={bookingStatus.uid}>
												{bookingStatus.name}
											</option>
										)
									})}
								</select>
							</div>
							<div className='flex flex-col gap-1'>
								<label>Start Time</label>
								<input
									value={booking.start_time}
									onChange={(e) => setBooking({ ...booking, start_time: e.target.value })}
									type='datetime-local'
									className='bg-white px-3 py-1.5 border border-slate-200 rounded-md outline-none cursor-pointer hover:border-cyan-300'
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label>Duration</label>
								<input
									value={booking.duration}
									onChange={(e) => setBooking({ ...booking, duration: e.target.value })}
									type='number'
									className='bg-white px-3 py-1.5 border border-slate-200 rounded-md outline-none cursor-pointer hover:border-cyan-300'
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label>Reason</label>
								<textarea
									value={booking.reason}
									onChange={(e) => setBooking({ ...booking, reason: e.target.value })}
									className='bg-white px-3 py-1.5 border border-slate-200 rounded-md outline-none cursor-pointer hover:border-cyan-300'
								/>
							</div>
						</div>
					)}
					<div className='border-t border-slate-300 px-5 py-2 flex justify-end'>
						<button
							onClick={createBooking}
							className='bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-md mr-2'
						>
							Create
						</button>
						<button
							onClick={closeModal}
							className='bg-slate-300 hover:bg-slate-400 text-white p-2 rounded-md'
						>
							Cancel
						</button>
					</div>
				</div>
			</ModalCard>
		</Modal>
	)
}

export default BookingsCreateModal
