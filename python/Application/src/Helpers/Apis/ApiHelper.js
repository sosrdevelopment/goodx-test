const { default: customFetch } = require('./AjaxHelper')

module.exports = {
	//  users
	loginUser: (req) => {
		return customFetch(
			'/api/sessions',
			'post',
			{ 'Content-Type': 'application/json' },
			req
		).then((r) => {
			return r.data
		})
	},
	//	diaries
	indexDiaries: () => {
		return customFetch('/api/diaries', 'get', {
			'Content-Type': 'application/json',
		}).then((r) => {
			return r.data
		})
	},
	//	bookings
	createBooking: (booking) => {
		return customFetch(
			'/api/bookings',
			'post',
			{
				'Content-Type': 'application/json',
			},
			booking
		).then((r) => {
			return r.data
		})
	},
	indexBookings: (diary_uid) => {
		return customFetch('/api/bookings?diary_uid=' + diary_uid, 'get', {
			'Content-Type': 'application/json',
		}).then((r) => {
			return r.data
		})
	},
	showBooking: (booking_uid) => {
		return customFetch('/api/bookings?booking_uid=' + booking_uid, 'get', {
			'Content-Type': 'application/json',
		}).then((r) => {
			return r.data
		})
	},
	updateBooking: (booking_uid, booking) => {
		return customFetch(
			'/api/bookings/' + booking_uid,
			'put',
			{
				'Content-Type': 'application/json',
			},
			booking
		).then((r) => {
			return r.data
		})
	},
	deleteBooking: (booking_uid) => {
		return customFetch('/api/bookings/' + booking_uid, 'delete', {
			'Content-Type': 'application/json',
		}).then((r) => {
			return r.data
		})
	},
	//	booking-types
	indexBookingTypes: () => {
		return customFetch('/api/bookingTypes', 'get', {
			'Content-Type': 'application/json',
		}).then((r) => {
			return r.data
		})
	},
	//	booking-statuses
	indexBookingStatuses: () => {
		return customFetch('/api/bookingStatuses', 'get', {
			'Content-Type': 'application/json',
		}).then((r) => {
			return r.data
		})
	},
	//	patients
	indexPatients: () => {
		return customFetch('/api/patients', 'get', {
			'Content-Type': 'application/json',
		}).then((r) => {
			return r.data
		})
	},
}
