let log = undefined

// Call new to construct a new message for the log port.
class Message {
	constructor(author, fn, ...args){
		this.author = author
		this.fn = fn
		this.msg = args
	}
}

function onOrder(order) {
	log
	.postMessage(new Message(
				chrome.runtime.id,
				"onOrder",
				`Received order from ${order.author}`))

	// I don't know what i'm gonna use this service worker for 
	// since i'm pretty sure i can call most of the functions the site blocker has 
	// from the content script, but it's good to have it here ig
	// i'll remove it if i don't use it
}

function connectionHandler(port) {
	console.log("Received connect from: ", port.name)

	// I don't think this is good code but like, whatever
	switch (port.name) {
		case "log":
			log = port // Assigning this port to a global variable
			break;
		case "cmd":
			port.onMessage.addListener(onOrder)
			break;
		default:
			log
			.postMessage(new Message(
					chrome.runtime.id,
					"connectionHandler", 
					"Invalid port, disconnecting."))
			port.disconnect()
			break;
	}

	if (log === undefined){
		port.disconnect()
		console.log("Cannot log to notify the connection, so a disconnect was called.")
	}

	log
	.postMessage(new Message(
			chrome.runtime.id,
			"connectionHandler",
			`Connection established on ${port.name}.`))

	port.onDisconnect.addListener(() => {
		console.log(`-- Disconnected from port ${port.name}`)
	})
}

// Entry point?
chrome.runtime.onConnect.addListener(connectionHandler)
