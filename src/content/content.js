// Funny logging function i made¿reg
function Log(is_enabled, fn, ...msg) {
	if (is_enabled) {
		console.log(`-- LobsterProtect::${fn}() \n\t::`, ...msg);
	}
}
// ?reg

// Called only when LobsterProtect is triggered ¿reg
function onTrigger(dbg, order) {
	Log(dbg, "onTrigger", "Triggered");

	switch (order.action) {
		case E_Actions.REDIRECT:
			Log(dbg, "onTrigger", "Redirecting to: ", order.redirect);
			window.location.hostname = order.redirect;
			break;

		case E_Actions.CLOSE_WINDOW:
			Log(dbg, "onTrigger", "Destroying window...");
			break;

		case E_Actions.NONE:
			Log(
				true,
				"onTrigger",
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
	const { sites_arr, opts } = await chrome.storage.local.get({
		sites_arr: ["www.youtube.com", "www.google.com"],
		opts: {
			on_trigger: {
				action: E_Actions.NONE,
				redirect: "www.minecraft.net",
			},
			debug: true,
		},
	});

	// Building a set out of the sites array, to prevent duplicate entries if any.
	const siteset = new Set(sites_arr);
	Log(opts.debug, "main", "Loaded site list:", siteset);

	// Getting the current site
	const current_site = window.location.hostname;
	Log(opts.debug, "main", "Found hostname:", current_site);

	// If we're on a site we shouldn't be in
	if (siteset.has(current_site)) onTrigger(opts.debug, opts.on_trigger);
}

// Loading the entry point after content loads.
document.addEventListener("DOMContentLoaded", main);
