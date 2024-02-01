const { destroy, get, post, put, default: customFetch } = require('./AjaxHelper')

module.exports = {
	//  users
	aliveCheckUser: () => {
		return get('/api/users/alive').then((r) => r.data)
	},
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
}
