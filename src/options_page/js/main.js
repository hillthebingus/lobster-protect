/*
 * This creates and handles the GlobalPage object.
 * */
class GlobalPageClass {
	constructor() {
		/** Points of interest
		 * */
		// Poi ¿reg
		this.Poi = {
			save_button: document.getElementById("save-button"),
			/**
			 * POI related to the sitelist
			 * */
			// SiteList ¿reg
			SiteList: {
				/**
				 * Holds the reference to the Text Input that should have the name of the new element.
				 * @type {HTMLInputElement}
				 * */
				input_name: document.getElementById("entry-name-input"),

				/**
				 * Holds the reference to the button that triggers the adding of an entry.
				 * @type {HTMLInputElement}
				 * */
				add_button: document.getElementById("addsite-button-inv-button"),

				/**
				 * Holds the reference to the sitelist container.
				 * @type {HTMLElement}
				 * */
				container: document.getElementById("sitelist-container"),
			},
			// ?reg

			/**
			 * POI for the global settings.
			 * */
			// GlobalsSection ¿reg
			GlobalsSection: {
				/**
				 * The <select> with the on_trigger options.
				 * @type {HTMLSelectElement}
				 * */
				action_list: document.getElementById("action-select"),

				/**
				 * The <input> with the URL used when on_trigger is set to REDIRECT
				 * @type {HTMLSelectElement}
				 * */
				redirect_input: document.getElementById("redirect-url-input"),

				/**
				 * An array holding references to all of the switch elements.
				 * */
				Toggles: {
					whitelist: document.getElementById("whitelist-inv-checkbox"),
					debug: document.getElementById("debug-inv-checkbox"),
					trigger_happy: document.getElementById("th-inv-checkbox"),
				}
			},
			// ?reg

			/**
			 * POI with all things related to the placeholder.
			 * And some helper methods...
			 * */
			// Placeholder ¿reg
			Placeholder: {
				/**
				 * A reference to the placeholder itself.
				 * @private
				 * @type {HTMLElement}
				 * */
				_ref: document.getElementById("sitelist-placeholder-container"),

				/**
				 * References to all presets in the placeholder.
				 * @type {Array<HTMLElement>}
				 * */
				presets: Array.from(document.getElementsByClassName("preset-button")),

				/**
				 * Handles the visibility of the placeholder based on the number of children the placeholder has.
				 * @param n {Number}
				 * */
				refresh(n) {
					// Updates the display based on n
					console.log("Handling placeholder visibility. n is: ", n)
					this._ref.style.display = (n <= 0) ? "grid" : "none"
					document.getElementById("sitelist-container").style.display = (n > 0) ? "grid" : "none"
				},
			},
			// ?reg

		}
		// ?reg

		/**
		 * Contains things related to the site itself.
		 * Most of this is temporary, it's just in order to avoid calling chrome.storage over and over.
		 * */
		// Data ¿reg
		this.Data = {
			/**
			 * Temporary storage for the hosts we already know, whether they've been added, or synced.
			 * @type {Set<string>}
			 * */
			known_hosts: new Set([]),

			/**
			 * Temporary storage for the local sitelist.
			 * @type {Array<SiteLSEntry>}
			 * */
			local_sitels: [],

			/**
			 * Temporary storage for the options.
			 * */
			local_opts: {
				whitelist: false,
				trigger_happy: false,
				debug: true,
				on_trigger: {
					action: E_Actions.REDIRECT,
					redirect: ""
				}
			},
			/**
			 * Dirty simply means if we have unsaved changes.
			 * @type {boolean}
			 * */
			is_dirty: false
		}
		// ?reg
	}
}

/**
 * An object with all references and things related to the DOM and globals related to the management of the page's features.
 * @type {GlobalPageClass}
 * @global
 * */
// Creating the global scoped Object.
var PageObj;


document.addEventListener("DOMContentLoaded", () => {
	/**
	 * @type {GlobalPageClass}
	 * */
	PageObj = new GlobalPageClass()
})






