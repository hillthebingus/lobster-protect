let log

function remoteLog(fn, msg) {
	log.postMessage(`-- LobsterProtect(service-worker)::${fn}() \n\t=> ${msg}`)
	console.log(`-- LobsterProtect(service-worker)::${fn}() \n\t=> ${msg}`, ...arguments)
}

function onOrder(order) {
	remoteLog("onOrder", `Received order from ${order.author}`)

	// I don't know what i'm gonna use this service worker for 
	// since i'm pretty sure i can call most of the functions 
	// from the content script, but it's good to have it here ig
}

// - Do not do anything if a connection to that port doesn't exist.
function connectionHandler(port) {
	console.log("Received connect from: ", port.name)

	// I don't think this is good code but like, whatever
	switch (port.name) {
		case "log":
			log = port // Assigning this port to a global variable
			break;
		case "cmd":
			port.onMessage.addListener(onOrder)
			remoteLog("connectionHandler", "!! Orders port established, any order violating OrderProtocol sent through this port will cause a disconnect.")
			break;
		default:
			remoteLog("connectionHandler", "Invalid port, disconnecting.")
			port.disconnect()
			break;
	}

	remoteLog("connectionHandler", `Connection established on ${port.name}.`)

	port.onDisconnect.addListener(() => {
		console.log(`-- Disconnected from port ${port.name}`)
	})
}

// Entry point?
chrome.runtime.onConnect.addListener(connectionHandler)
