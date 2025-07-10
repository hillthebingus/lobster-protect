// Funny logging function i made ¿reg
function Log(is_enabled, fn, ...msg) {
	if (is_enabled) {
		console.log(`-- LobsterProtect::${fn}() \n\t::`, ...msg);
	}
}
// ?reg

/* TODO:
 * Overrides & working with new sitels format.
 *
 * Find a way to implement these features.
 */
// Called only when LobsterProtect is triggered ¿reg
function onTrigger(dbg, order, _override) {
	Log(dbg, "onTrigger", "Triggered");

	switch (order.action) {
		case E_Actions.CLOSE_WINDOW:
			Log(dbg, "onTrigger::CLOSE_WINDOW", "Connecting to service worker...");
			const _orders = chrome.runtime.connect({ name: "orders" });
			_orders.postMessage({
				author: chrome.runtime.id,
				action: "CLOSE_WINDOW",
			});
			break;

		case E_Actions.REDIRECT:
			Log(dbg, "onTrigger::REDIRECT", "Redirecting to: ", order.redirect);
			window.location.hostname = order.redirect;
			break;

		case E_Actions.NONE:
			Log(
				true,
				"onTrigger::NONE",
				"I was triggered, but i was told to not do anything.",
			);
			break;
	}
}
// ?reg

// Entry point.
async function main() {
	Log(true, "main", "Welcome to LobsterProtect!");

	// Getting the response object
	const { sitels, opts } = await chrome.storage.local.get({
		sitels: [
			{
				url: "www.youtube.com",
				strictness: -1,
				action_override: null
			},
			{
				url: "www.google.com",
				strictness: -1,
				action_override: null
			}
		],
		opts: {
			on_trigger: {
				action: E_Actions.NONE,
				redirect: "www.minecraft.net",
			},
			whitelist: false,
			debug: true,
		},
	});


	// Building a set out of the sites array, to prevent duplicate entries if any.
	const siteset = new Set(sitels);
	Log(opts.debug, "main", "Loaded site list:", siteset);

	// Getting the current site
	const current_site = window.location.hostname;
	Log(opts.debug, "main", "Found hostname:", current_site);

	// If we're on a site we shouldn't be in
	// FIXME this doesn't work anymore.
	if (siteset.has(current_site) && !opts.whitelist) {
		onTrigger(opts.debug, opts.on_trigger);
	} else if (!siteset.has(current_site) && opts.whitelist) {
		onTrigger(opts.debug, opts.on_trigger);
	}
}

// Loading the entry point after content loads.
document.addEventListener("DOMContentLoaded", main);
