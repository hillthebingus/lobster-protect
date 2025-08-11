
/**
 * Final callback.
 * @param {Boolean} skip Whether we skipped registration or not.
 * */
//¿reg
async function handleSuccess(skip) {
	await chrome.storage.local.set({
		skipped_registration: skip,
		session_is_valid: true,
	})
	window.location.pathname = "src/options_page/main.html"
}
// ?reg

// SHA-256 hashing stuff
// ¿reg
async function hash(str) {
	const raw_secret = str

	const byte_array = new TextEncoder().encode(raw_secret)
	const hash_buffer = await crypto.subtle.digest("SHA-256", byte_array)

	const hashed_secret = Array.from(new Uint8Array(hash_buffer))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");

	return hashed_secret
}
// ?reg

// setupLoginCallbacks
//¿reg
async function setupLoginCallbacks() {
	const msg = document.getElementById("welcome-message").innerText
	const user = await chrome.storage.local.get({ username: "null" })

	document.getElementById("welcome-message").innerText = msg.replace("{user}", user.username)


	document.getElementById("login-button").addEventListener("click", async function() {
		const hashed_passwd = await chrome.storage.local.get({ password: null })
		const hashed_input = await hash(document.getElementsByName("password")[0].value)

		console.log("pass: ", hashed_passwd, "ipt:", hashed_input)
		if (hashed_input === hashed_passwd.password) {
			handleSuccess(false)
		} else {
			document.getElementsByName("password")[0].style.borderBottom = "solid 2px var(--clr-nono)"
			alert("Incorrect password.")
			return
		}
	})
}
// ?reg

// setupRegistrationCallbacks
// ¿reg
async function setupRegistrationCallbacks() {

	// For the reveal password checkbox
	document.getElementById("reveal-pass").addEventListener("click", function() {
		if (this.checked) document.getElementsByName("password")[0].setAttribute("type", "text")
		if (!this.checked) document.getElementsByName("password")[0].setAttribute("type", "password")
	})

	document.getElementById("register-button").addEventListener("click", async () => {
		// oh my gosh guys deltarune reference no way
		// the javascriptgrave route:
		// this was totally unintentional btw
		let proceed = document.getElementsByName("username")[0]
		if (!proceed.value) {
			alert("You are missing your username!")
			proceed.style.borderBottom = "solid 2px var(--clr-nono)"
			return
		}

		proceed = document.getElementsByName("password")[0]
		if (!proceed.value) {
			alert("You are missing your password!")
			proceed.style.borderBottom = "solid 2px var(--clr-nono)"
			return
		}

		proceed = document.getElementById("agreement-checkbox")
		if (!proceed.checked) {
			alert("You are missing your password!")
			proceed.style.outline = "solid 2px var(--clr-nono)"
			return
		}


		const registration_object = {
			username: document.getElementsByName("username")[0].value,
			password: await hash(document.getElementsByName("password")[0].value),
		}

		await chrome.storage.local.set(registration_object)
		handleSuccess(false)
	})

	document.getElementById("no-register-button").addEventListener("click", () => {
		if (confirm("Are you sure you wish to not register? You won't miss out on anything but your dashboard will not be password protected.\n\nYou can always register to add password protection later.")) {
			handleSuccess(true)
		}
	})
}
// ?reg

document.addEventListener("DOMContentLoaded", () => {
	if (document.getElementsByName("username")[0]) {
		setupRegistrationCallbacks()
	} else {
		setupLoginCallbacks()
	}
})
