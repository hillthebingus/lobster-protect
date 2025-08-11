// on_trigger actions.
const E_Actions = Object.freeze({
	NONE: 0, // For debugging purposes, simply logs that LobsterProtect was told to do nothing.
	CLOSE_WINDOW: 1, // Trigger the closing of the window
	CLOSE_TAB: 2, // Closes the current tab
	REDIRECT: 3, // Redirects the user to on_trigger.redirect
});
