// Funny logging function i made ¿reg
function Log(is_enabled, fn, ...msg) {
	if (is_enabled) {
		console.log(`-- LobsterProtect::${fn}() \n\t::`, ...msg);
	}
}
// ?reg

// Called only when LobsterProtect is triggered ¿reg
function onTrigger(dbg, on_trigger, _override) {
	Log(dbg, "onTrigger", "Triggered.");


	// Use the override if we have one.
	const action = (_override === null) ? on_trigger.action : _override.action
	Log(dbg, "onTrigger", "Connecting to service worker...");
	const _orders = chrome.runtime.connect({ name: "orders" });


	switch (action) {
		case E_Actions.CLOSE_WINDOW:
			_orders.postMessage({
				author: chrome.runtime.id,
				action: "CLOSE_WINDOW",
			});
			break;

		case E_Actions.CLOSE_TAB:
			Log(dbg, "onTrigger::CLOSE_TAB", "Closing tab...");
			_orders.postMessage({
				author: chrome.runtime.id,
				action: "CLOSE_TAB",
			});
			break;

		case E_Actions.REDIRECT:
			Log(dbg, "onTrigger::REDIRECT", "Redirecting to: ", on_trigger.redirect);
			window.location.hostname = on_trigger.redirect;
			break;


		case E_Actions.NONE:
			Log(
				true,
				"onTrigger::NONE",
				"I was triggered, but i was told to not do anything. DEBUG",
			);
			break;
		default:
			alert(`-- LobsterProtect(content.js)::onTrigger()\n-> ERROR Unknown on_trigger.action |${action}|`)
			break;
	}
}
// ?reg

// Loading the entry point.
// ¿reg
document.addEventListener("DOMContentLoaded", async () => {
	Log(true, "main", "Welcome to LobsterProtect!");

	// Getting the responses
	const { sitels, opts } = await chrome.storage.local.get({
		sitels: [],
		opts: {
			on_trigger: {
				action: E_Actions.NONE,
				redirect: "",
			},
			whitelist: false,
			trigger_happy: false,
			debug: false,
		},
	});

	// Getting the current site
	const current_site = window.location.hostname;
	Log(opts.debug, "main", "Current hostname:", current_site);
	Log(opts.debug, "sitels.every", "Current sitelist: ", sitels)
	Log(opts.debug, "sitels.every", "Current opts: ", opts)

	let found_page = null;

	/* This mess is in charge of detecting if we're on a forbidden site... 
	 * found_page either contains null or the SiteLSEntry that triggered LobsterProtect
	 * */
	if (sitels.every((v) => {
		if (opts.trigger_happy) {
			found_page = (current_site.includes(v.hostname)) ? v : null
		} else {
			found_page = (v.hostname === current_site) ? v : null
		}
		return !(found_page)
	})) {
		// This handles whitelist.
		// passing null as the override because we're not dealing with a SiteLSEntry object.
		if (opts.whitelist) onTrigger(opts.debug, opts.on_trigger, null)

		// This handles blacklist. Weird syntax but ok.
	} else if (!opts.whitelist) onTrigger(opts.debug, opts.on_trigger, found_page.action_override)
});
// ?reg
