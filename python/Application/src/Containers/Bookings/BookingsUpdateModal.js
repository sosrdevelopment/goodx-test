import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import Modal from '../../Components/Modals/Modal'
import ModalCard from '../../Components/Cards/ModalCard'
import ApiHelper from '../../Helpers/Apis/ApiHelper'
import ResponsiveLoadingCard from '../../Components/Cards/ResponsiveLoadingCard'
import Button from '../../Components/Buttons/Button'
import TextInput from '../../Components/Inputs/TextInput'

function BookingsUpdateModal({ booking_uid, isVisible, setIsVisible, reload }) {
	//  Variables
	const [bookingStatuses, setBookingStatuses] = useState(false)
	const [booking, setBooking] = useState(false)

	//  Initialize
	useEffect(() => {
		if (booking_uid && booking_uid !== null && booking_uid !== undefined)
			ApiHelper.showBooking(booking_uid)
				.then((response) => {
					if (response.data.length === 0) throw new Error('Booking not found')

					setBooking(response.data[0])
					console.log(response.data[0])
				})
				.catch((error) => {
					console.error(error)
					toast(error.message, { type: 'error' })
				})

		if (!bookingStatuses)
			ApiHelper.indexBookingStatuses().then((response) =>
				setBookingStatuses(response.data.sort((a, b) => a.name.localeCompare(b.name)))
			)
	}, [setBooking, bookingStatuses, setBookingStatuses, booking_uid])

	//  Functionality : Booking
	const updateBooking = useCallback(() => {
		confirmAlert({
			title: 'Update Booking',
			message: 'Are you sure you want to update this booking?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						ApiHelper.updateBooking(booking)
							.then(() => {
								if (reload) reload()
								setIsVisible(false)
								toast('Booking updated!', { type: 'success' })
							})
							.catch((error) => {
								if (error.message) toast(error.message, { type: 'error' })
							})
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		})
	}, [setIsVisible, booking, reload])

	const deleteBooking = useCallback(() => {
		confirmAlert({
			title: 'Delete Booking',
			message: 'Are you sure you want to delete this booking?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						ApiHelper.deleteBooking(booking.uid)
							.then(() => {
								if (reload) reload()
								setIsVisible(false)
								toast('Booking deleted!', { type: 'success' })
							})
							.catch((error) => {
								if (error.message) toast(error.message, { type: 'error' })
							})
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		})
	}, [setIsVisible, booking, reload])

	const closeModal = useCallback(() => {
		setBooking(null)
		if (isVisible) setIsVisible(false)
	}, [setBooking, isVisible, setIsVisible])

	//  Response
	if (!booking || !isVisible) return null
	return (
		<Modal isVisible={isVisible} setIsVisible={setIsVisible} closeCallback={closeModal}>
			<ModalCard outerClass='m-auto border'>
				<div
					className='w-[400px]'
					onClick={(e) => {
						e.stopPropagation()
						e.preventDefault()
					}}
				>
					<div className='border-b border-slate-200 px-5 py-2'>
						<p className='text-md font-medium'>Update Booking - {booking.invoice_nr}</p>
					</div>
					{!booking ? (
						<ResponsiveLoadingCard title='Loading Booking...' noBackground={true} />
					) : (
						<div className='p-5 space-y-4'>
							<div className='flex flex-col gap-1'>
								<label className='text-sm font-medium'>Patient</label>
								<TextInput
									value={booking.patient_name + ' ' + booking.patient_surname}
									disabled={true}
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='text-sm font-medium' htmlFor='booking_type_uid'>
									Booking Type
								</label>
								<TextInput value={booking.booking_type} disabled={true} />
							</div>
							<div className='border-t border-slate-300'></div>
							<div className='flex flex-col gap-1'>
								<label className='text-sm font-medium' htmlFor='booking_status_uid'>
									Booking Status
								</label>
								<select
									className='w-full border border-slate-300 rounded-md p-2'
									value={booking.booking_status_uid}
									onChange={(e) =>
										setBooking({ ...booking, booking_status_uid: e.target.value })
									}
								>
									{bookingStatuses.map((status) => (
										<option key={status.uid} value={status.uid}>
											{status.name}
										</option>
									))}
								</select>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='text-sm font-medium' htmlFor='start_time'>
									Start Time
								</label>
								<input
									className='w-full border border-slate-300 rounded-md p-2'
									type='datetime-local'
									value={booking.start_time}
									onChange={(e) => setBooking({ ...booking, start_time: e.target.value })}
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='text-sm font-medium' htmlFor='duration'>
									Duration (minutes)
								</label>
								<input
									className='w-full border border-slate-300 rounded-md p-2'
									type='number'
									value={booking.duration}
									onChange={(e) => setBooking({ ...booking, duration: e.target.value })}
								/>
							</div>
							<div className='flex flex-col gap-1'>
								<label className='text-sm font-medium' htmlFor='reason'>
									Reason
								</label>
								<textarea
									className='w-full border border-slate-300 rounded-md p-2'
									value={booking.reason}
									onChange={(e) => setBooking({ ...booking, reason: e.target.value })}
								/>
							</div>
						</div>
					)}
					<div className='border-t border-slate-300 px-5 py-2 flex justify-between'>
						<Button
							className='bg-red-500 text-white hover:bg-red-600'
							onClick={deleteBooking}
						>
							Delete
						</Button>
						<div className='flex space-x-3'>
							<Button
								className='bg-cyan-500 text-white hover:bg-cyan-600'
								onClick={updateBooking}
							>
								Update
							</Button>
							<Button
								className='bg-slate-500 text-white hover:bg-slate-600'
								onClick={closeModal}
							>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			</ModalCard>
		</Modal>
	)
}

export default BookingsUpdateModal
