// Funny logging function i made ¿reg
function Log(is_enabled, fn, ...msg) {
	if (is_enabled) {
		console.log(`-- LobsterProtect::${fn}() \n\t::`, ...msg);
	}
}
// ?reg

// Called only when LobsterProtect is triggered ¿reg
function onTrigger(dbg, order, _override) {
	Log(dbg, "onTrigger", "Triggered.");


	// Use the override if we have one.
	const action = (_override === null) ? order.action : _override.action


	switch (action) {
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
	// TODO Once the options page is finished, remove the defaults.
	const { sitels, opts } = await chrome.storage.local.get({
		sitels: [
			{
				url: "www.youtube.com",
				leniency: 0,
				action_override: null
			},
			{
				url: "www.google.com",
				leniency: 0,
				action_override: null
			}
		],
		opts: {
			on_trigger: {
				action: E_Actions.NONE,
				redirect: "www.minecraft.net",
			},
			whitelist: true,
			debug: true,
		},
	});

	// Getting the current site
	const current_site = window.location.hostname;
	Log(opts.debug, "main", "Found hostname:", current_site);

	// If we're on a site we shouldn't be in
	sitels.forEach(e => {
		// Unreadable magic, but it just checks our current site keeping in mind our whitelist.
		if (e.url === current_site && opts.whitelist === false || e.url !== current_site && opts.whitelist === true) {
			onTrigger(opts.debug, opts.on_trigger, e.action_override)
		}
	});
}

// Loading the entry point after content loads.
document.addEventListener("DOMContentLoaded", main);
