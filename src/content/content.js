
// TODO Site list.
const {sites} = chrome.storage.local.get({ sites:[]})

function Log(fn, ...msg) {
	console.log(`-- LobsterProtect::${fn}()\n\t=>`, ...msg)
}

// Important ports.
const logs = chrome.runtime.connect({ name: "log" })
	logs.onMessage.addListener((message) => {
		console.log(`-- LobsterProtect(service-worker)::${message.fn}() \n\t=>`, ...message.msg)
	})

// The port from which we order the service worker to do things.
const order = chrome.runtime.connect({ name: "cmd" })

// Called only when LobsterProtect is triggered
function onTrigger() {
	Log("onTrigger()", "Triggered")
	// TODO: Actions.
}


// Entry point.
function main() {
	Log("main", "Entered")
	Log("main", "Found hostname:", window.location.hostname)
	Log("main", "Loaded site list:", sites)

	if (sites.has(window.location.hostname)) onTrigger()
}

// Loading the entry point after content loads.
document.addEventListener("DOMContentLoaded", main())
