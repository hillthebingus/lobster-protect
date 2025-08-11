

document.addEventListener("DOMContentLoaded", async () => {
	const is_registered = await chrome.storage.sync.get({
		account: null
	})

	if (is_registered.account == null) {
		window.location.pathname = "src/options_page/register.html"
	} else {
		window.location.pathname = "src/options_page/login.html"
	}
})

