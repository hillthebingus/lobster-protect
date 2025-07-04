

function connectionHandler(port) {
	console.log("Received connect from: ", port.name);

	port.onDisconnect.addListener(() => {
		console.log(`-- Disconnected from port ${port.name}`);
	});
}

// Entry point?
chrome.runtime.onConnect.addListener(connectionHandler);
