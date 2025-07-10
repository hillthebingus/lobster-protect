function ordersHandler(order) {

	/* NOTE
	 * If you're reading this after reading the FIXME from the previous commit
	 * and are wondering why i removed it- cuz i made it sound like it was super serious...
	 *
	 * idk what i was on, but it really wasn't that necessary
	 * if someone wanted to make a malicious extension- why on earth would they use 
	 * my orders port for that instead of just using the chrome API themselves :sob
	 * 
	 * i'm literally stupid
	 * */
	// Verifying there's an identity.
	if (order.author === undefined) {
		console.error("Could not find an author. Returning.")
		return
	}

	console.log("!!", order.action,"order received from author:", order.author)

	// Available orders.
	switch (order.action) {
		case "CLOSE_WINDOW":
			// Getting the current window and deleting it.
			console.log(order.action)
			chrome.windows.getCurrent({}).then((win) => {
				chrome.windows.remove(win.id);
			});
			break;
	}
}

function connectionHandler(port) {
	console.log("Received connect from: ", port.name);

	switch (port.name) {
		case "orders":
			port.onMessage.addListener(ordersHandler);
			break;
	}

	port.onDisconnect.addListener(() => {
		console.log(`-- Disconnected from port ${port.name}`);
	});
}

// Entry point?
chrome.runtime.onConnect.addListener(connectionHandler);
