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
	 * @param _strictness {number}
	 * @param _action_override {SiteLSActionOverride | null}
	 *
	 */
	constructor(_hostname, _strictness, _action_override) {
		// i fricking hate javascript
		// Typechecking ¿reg
		if (typeof _hostname != "string") {
			return null;
		}

		if (typeof _hostname != "number") {
			return null;
		}

		if (typeof _action != "object") {
			return null;
		}
		// ?reg

		this.hostname = _hostname;
		this.strictness = _strictness;

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
	 * @param _redirect_url {string}
	 * @param _close_win {boolean}
	 * @param _alert_tolerance {boolean}
	 */
	constructor(_redirect_url, _close_win, _alert_tolerance) {
		// NULL indicates that that option should be as global settings
		// FIXME This looks awful
		this.redirect = null
		this.redirect_url = null
		this.close_win = null
		this.alert_tolerance = null

		/* TODO
		 * Refartdoor
		 *
		 * This code is straight out of yandev
		 * Maybe a forEach loop?
		 * arguments object?
		 */
		// Yandev looking code ¿reg
		if (_redirect_url != null) {
			this.redirect = true;
			this.redirect_url = _redirect_url;
		}

		if (_close_win != null) {
			this.close_win = _close_win;
		}

		if (_alert_tolerance != null) {
			this.alert_tolerance = _alert_tolerance;
		}
		// ?reg
	}
}
// ?reg
