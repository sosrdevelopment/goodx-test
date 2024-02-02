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
	indexBookings: (diary_uid) => {
		return customFetch('/api/bookings?diary_uid=' + diary_uid, 'get', {
			'Content-Type': 'application/json',
		}).then((r) => {
			return r.data
		})
	},
}
