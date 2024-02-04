import Card from '../../Components/Cards/Card'

function DiaryBookingsTab({ isVisible, bookings, updateBooking }) {
	//  Variables
	const currentDate = new Date()
	const nextWeek = new Date().setDate(currentDate.getDate() + 7)

	//  Response
	if (!isVisible) return null

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 w-full gap-4 mb-auto'>
			{bookings
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
					if (booking.booking_status === 'Done') {
						urgency = 'shadow-green-300 hover:border-green-400'
					} else if (booking.booking_status === 'Arrived') {
						urgency = 'shadow-cyan-300 hover:border-cyan-400'
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
								<p className='text-lg font-bold text-center pb-1'>{booking.invoice_nr}</p>
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
	)
}

export default DiaryBookingsTab
