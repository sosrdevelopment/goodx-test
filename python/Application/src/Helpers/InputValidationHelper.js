const isValidEmail = (email) => {
	try {
		if (!email.includes('@')) return false

		let splitEmail = email.split('@')
		if (splitEmail[0].length < 1) return false
		if (splitEmail[1].length < 3) return false
		if (!splitEmail[1].includes('.')) return false

		splitEmail = splitEmail[1].split('.')
		if (splitEmail[0].length < 1) return false
		if (splitEmail[1].length < 1) return false

		return true
	} catch {
		return false
	}
}

const isValidFullName = (name) => {
	try {
		if (name.length <= 3) return false
		if (!name.includes(' ')) return false

		let splitName = name.split(' ')
		if (splitName[0].length < 2) return false
		if (splitName[1].length < 2) return false

		return true
	} catch {
		return false
	}
}

const isValidPassword = (password) => {
	try {
		if (password.length < 5) return false
		return true
	} catch {
		return false
	}
}

const isValidPhoneNumber = (phoneNumber) => {
	try {
		if (phoneNumber.length !== 10) return false
		return true
	} catch {
		return false
	}
}

//  --- response ---
module.exports = {
	isValidEmail,
	isValidFullName,
	isValidPassword,
	isValidPhoneNumber,
}
