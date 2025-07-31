/**
 * Rebuilds the whole `site_container` grid. 
 * If input isn't `null` then we first check if the `sitelist` already has a `SiteLSEntry` with the same `hostname`.
 *
 * Returns a boolean that specifies whether we returned early or not.
 *
 * If you're passing `null` to `input`, it's kinda pointless to check the return.
 *
 * @param {HTMLElement} site_container
 * @param {Array<SiteLSEntry>} sitelist
 * @param {string|null} input
 * @returns {boolean} returned_early
 * ¿reg */
function rebuildTable(site_container, sitelist, input) {

	if (input !== null) {
		// NOTE goodness gracious...
		// Checking if the SiteLSEntry exists, if it does, early return, if it doesn't, push it to the sitelist
		if (sitelist.some((e) => {
			return (e.hostname === input) ? true : false
		})) { return false } else {
			/* TODO
			 * Fix Temporary
			 *
			 * Right now a lot of functionality isn't available, so we can keep this simple.
			 * Once we add the rest of functionality, this needs to be changed to assume input is a SiteLSEntry object.
			 */
			sitelist.push(new SiteLSEntry(input, 0, null))
		}
	}

	// Constructing the entries.
	sitelist.forEach((e) => {
		// UGLY HTML building. ¿reg

		// The name area
		const n_entry_name = document.createElement("span")
		n_entry_name.textContent = e.hostname
		n_entry_name.id = e.hostname
		n_entry_name.classList = "entry-name"
		site_container.appendChild(n_entry_name)

		// The delete option, later the flexbox with the other options TODO
		const options_label = document.createElement("label")
		options_label.classList = "entry-del-hb"

		// The bg of the button.
		const options_bg = document.createElement("span")
		options_bg.classList = "entry-del-bg"

		// The actually pressed button.
		const options_inv_button = document.createElement("input")
		options_inv_button.classList = "entry-del-inv-button"
		options_inv_button.setAttribute("type", "button")
		options_inv_button.setAttribute("ref", e.hostname)

		// Composing the custom button. from the above.
		options_label.append(options_bg, options_inv_button)

		// The options, currently they're just deletion.
		site_container.appendChild(options_label)

		// The stupid separator.
		const separator = document.createElement("span")
		separator.classList = "list-separator"

		site_container.appendChild(separator)

		// ?reg
	});

}
// ?reg

/* Syncing the sitelist and other info with the page.*/
// ¿reg
async function syncSite() {


	const { sitelist, opts } = await chrome.storage.sync.get({
		sitelist: [
			{
				hostname: "www.youtube.com"
			},
			{
				hostname: "www.stupids.com"
			},
			{
				hostname: "www.minecraft.com"
			},
		],
		opts: {
			whitelist: false,
			on_trigger: {
				action: E_Actions.NONE,
				redirect: "www.minecraft.com"
			},
			debug: false
		}
	});

	// Handling the creation of the table.
	rebuildTable(document.getElementById("sitelist-container"), sitelist, null)

	/* TODO
	 * Rewrite
	 *
	 * This is supposed to be a hack for now as LobsterProtect does not have many features as of 1.0. Refactor this after 1.0
	 * Make this more expandable and less verbose.
	 * */
	document.getElementById("whitelist-inv-checkbox").checked = opts.whitelist
	document.getElementById("cbot-inv-checkbox").checked = (opts.on_trigger.action === E_Actions.CLOSE_WINDOW)
	document.getElementById("debug-inv-checkbox").checked = opts.debug

	// Configuring the site.
	configure()
}
// ?reg

/** 
 * Implements the site's functionality.
 * */
//¿reg
function configure() {
	/* Making the navigation bar functional */
	const nav_buttons = document.getElementsByClassName("navbar-inv-radio");

	Array.from(nav_buttons).forEach((el) => {
		el.addEventListener("click", function() {
			document.body.classList = "";
			let _current_section = document.getElementsByClassName("content-show")[0];

			// Handles our current section.
			_current_section.classList.remove("content-show");
			_current_section.classList.add("content-hide");

			// Handles the switch animation.
			document
				.getElementById(this.getAttribute("ref"))
				.classList.add("content-show");
			document
				.getElementById(this.getAttribute("ref"))
				.classList.remove("content-hide");
		});
	});

	/* Get the site list container. */
	const sitelist_container = document.getElementById("sitelist-container");
	const sitelist_placeholder = document.getElementById(
		"sitelist-placeholder-container",
	);

	// Removing the sitelist by default. We add this back if it has elements.
	sitelist_container.style.display = "none";

	// If the list has elements remove the placeholder and add back the sitelist.
	if (sitelist_container.childElementCount > 2) {
		sitelist_container.style.display = "grid";
		console.log("Removing placeholder.");
		sitelist_placeholder.remove();
	}

}
//?reg

// Loading the entry point after DOM loads.
document.addEventListener("DOMContentLoaded", syncSite);
