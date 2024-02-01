//  --- imports ---
const axios = require('axios')

//  --- functionality ---
const customFetch = (url, method, headers, body, checks, parse) => {
	return axios
		.request({
			url: url,
			method: method,
			data: body,
			headers: headers,
		})
		.then((response) => {
			if (checks && checks.ok && response.status >= 400) throw response
			if (parse && parse.json) return response.data
			if (parse && parse.text) return response.data.text()
			return response
		})
		.catch((error) => {
			if (error.response.status === 401) {
				window.localStorage.removeItem('sessionUser')
				return window.location.reload()
			}
		})
}

module.exports = {
	fetch: customFetch,
	post: (url, headers, body) => {
		return customFetch(url, 'post', headers, body)
	},
	get: (url, headers) => {
		return customFetch(url, 'get', headers, null, { ok: true })
	},
	put: (url, headers, body) => {
		return customFetch(url, 'put', headers, body)
	},
	destroy: (url, headers) => {
		return customFetch(url, 'delete', headers)
	},
}
