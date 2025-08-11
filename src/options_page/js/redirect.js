

document.addEventListener("DOMContentLoaded", async () => {
	const user = await chrome.storage.local.get()

	if (user.skipped_registration) {
		window.location.pathname = "src/options_page/main.html"
		return
	}

	if (!user.username) {
		window.location.pathname = "src/options_page/register.html"
	} else {
		window.location.pathname = "src/options_page/login.html"
	}
})

