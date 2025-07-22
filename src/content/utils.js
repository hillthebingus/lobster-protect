// Enum, or something
const E_Actions = Object.freeze({
	NONE: 0, // For debugging purposes, simply logs that LobsterProtect was told to do nothing.
	CLOSE_WINDOW: 1, // Tigger the closing of the window
	REDIRECT: 2, // Redirects the user to on_trigger.redirect
});

// SiteLSEntry ¿reg
/**
 * @class SiteLSEntry Represents a sitelist entry.
 */
class SiteLSEntry {
	/**
	 * Returns a sitelist entry object.
	 * @param _hostname {string}
	 * @param _leniency {number}
	 * @param _action_override {SiteLSActionOverride | null}
	 *
	 */
	constructor(_hostname, _leniency, _action_override) {
		this.hostname = (typeof _hostname === "string") ? _hostname : null;
		this.leniency = (typeof _leniency === "number") ? _leniency : null;
		// This should be an object detailing what the actions for this object are
		// Use new SiteLSActionOverride(args), don't type this object manually
		this.action_override = _action_override;
	}
}
// ?reg

// SiteLSActionOverride ¿reg
/**
 * @class SiteLSActionOverride Represents the personal override for an entry on the sitelist.
 */
class SiteLSActionOverride {
	/**
	 * @param _action_override {Object}
	 */
	constructor(_action_override) {
		if (!("action" in _action_override && "redirect" in _action_override)) {
			console.error("Invalid action_override object.");
			return null;
		}
		this.action_override = _action_override ? _action_override : null;
	}
}
// ?reg
