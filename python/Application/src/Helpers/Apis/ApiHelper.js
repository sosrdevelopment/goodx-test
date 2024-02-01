const { destroy, get, post, put } = require('./AjaxHelper')

module.exports = {
	//  users
	aliveCheckUser: () => {
		return get('/api/users/alive').then((r) => r.data)
	},
	loginUser: (req) => {
		return post('/api/users/login', null, req).then((r) => r.data)
	},
}
