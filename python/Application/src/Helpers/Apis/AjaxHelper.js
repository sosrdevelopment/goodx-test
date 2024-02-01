import axios from 'axios'

//  --- functionality ---
function customFetch(url, method, headers, body, checks, parse) {
	return axios({
		url: 'http://127.0.0.1:8080' + url,
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
			}
		})
}

export default customFetch