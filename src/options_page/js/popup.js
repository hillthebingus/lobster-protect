

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("goto-button").addEventListener("click", () => {
		chrome.runtime.openOptionsPage()
	})
})
