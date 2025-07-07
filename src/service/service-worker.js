function ordersHandler(order) {

	/* FIXME
	 * URGENCY: Low
	 *
	 * Maybe find a way to verify our identity better?
	 *
	 * As it stands as long as you have access to the string that corresponds to
	 * the extension ID of LobsterProtect (which isn't that hard to get...), you will
	 * be perfectly able to execute an order from a separate extension.
	 *
	 * NOTE
	 * A better security would be great but it's not urgent as of v1.0, as 
	 * LobsterProtect will not have much power over the browser on release.
	 */
	if (order.author !== chrome.runtime.id) {
		console.error("Unable to verify LobsterProtect's ID. Returning.");
		return;
		// Verifying it is our content script who is sending the request.
	}

	switch (order.action) {
		case "CLOSE_WINDOW":
			// Getting the current window and deleting it.
			chrome.windows.getCurrent({}).then((win) => {
				console.log("removeing");
				// chrome.windows.remove(win.id);
			});
			break;

		default:
			console.log("hello vro ♥");
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
