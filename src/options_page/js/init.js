/**
 * Handles the building of the HTML structure of an entry on the sitelist.
 * And appends it.
 * @param {string} entry_name 
 * */
// buildEntry ¿reg
function newEntry(entry_name, is_temp) {
	// The name area
	const n_entry_name = document.createElement("span")
	n_entry_name.textContent = entry_name
	if (is_temp) {
		n_entry_name.classList = "entry-name temp-entry " + entry_name
		document.getElementById("stay-clean").classList.add("shine-when-dirty")
		PageObj.Data.is_dirty = true
	} else {
		n_entry_name.classList = "entry-name " + entry_name
	}
	PageObj.Poi.SiteList.container.appendChild(n_entry_name)

	// The delete option, later the flexbox with the other options TODO
	const options_label = document.createElement("label")
	options_label.classList = "entry-del-hb dirty " + entry_name

	// The bg of the button.
	const options_bg = document.createElement("span")
	options_bg.classList = "entry-del-bg"

	// The actually pressed button.
	const options_inv_button = document.createElement("input")
	options_inv_button.classList = "entry-del-inv-button"
	options_inv_button.setAttribute("type", "button")
	options_inv_button.setAttribute("ref", entry_name)
	options_inv_button.addEventListener("click", function() {
		const del_ref = this.getAttribute("ref")
		// Removing the elements.
		Array.from(document.getElementsByClassName(del_ref)).forEach((e) => {
			e.remove()
		})

		n_entry_name.classList = "entry-name temp-entry " + entry_name
		document.getElementById("stay-clean").classList.add("shine-when-dirty")
		PageObj.Data.is_dirty = true

		PageObj.Data.known_hosts.delete(del_ref)
		console.log(PageObj.Data.known_hosts)
		PageObj.Poi.Placeholder.refresh(PageObj.Data.known_hosts.size)
	})

	// Composing the custom button. from the above.
	options_label.append(options_bg, options_inv_button)

	// The options, currently they're just deletion.
	PageObj.Poi.SiteList.container.appendChild(options_label)

	// The stupid separator.
	const separator = document.createElement("span")
	separator.classList = "list-separator " + entry_name

	PageObj.Poi.SiteList.container.appendChild(separator)
}
// ?reg

// Our entry point.
/*
 * We handle the initial synchronization of the page.
 * */
document.addEventListener("DOMContentLoaded", async () => {

	const { sitels } = await chrome.storage.sync.get({
		sitels: []
	})
	const { opts } = await chrome.storage.sync.get({
		opts: {
			whitelist: false,
			debug: false,
			on_trigger: {
				action: E_Actions.NONE,
				redirect: "www.google.com"
			}
		}
	})


	// Building the initial known_hosts
	sitels.forEach((e) => {
		PageObj.Data.known_hosts.add(e.hostname)
	});
	PageObj.Data.known_hosts.forEach((e) => {
		newEntry(e, false)
	})

	// Refreshing the placeholder so it's shown appropriately
	PageObj.Poi.Placeholder.refresh(PageObj.Data.known_hosts.size)

	/*******
	 * Handling the buttons and other inputs.
	 * Adding the listeners.
	 * */
	// addsite listener. ¿reg
	PageObj.Poi.SiteList.add_button.addEventListener("click", () => {
		// Be a big shot.
		const name = PageObj.Poi.SiteList.input_name.value

		// for illegal inputs... this junk is strait up ugly :sob
		if (name.includes(" ") || name === "" || PageObj.Data.known_hosts.has(name)) {
			PageObj.Poi.SiteList.input_name.style.background = "var(--clr-nono)"
			PageObj.Poi.SiteList.input_name.style.color = "black"
			PageObj.Poi.SiteList.input_name.classList.add("bad-placeholder")
			return

		} else {
			PageObj.Poi.SiteList.input_name.style.background = "var(--clr-placeholderbg)"
			PageObj.Poi.SiteList.input_name.style.color = "white"
			PageObj.Poi.SiteList.input_name.value = ""
			PageObj.Poi.SiteList.input_name.classList.remove("bad-placeholder")
		}

		// building it.
		newEntry(name, true)
		PageObj.Data.known_hosts.add(name)
		PageObj.Poi.Placeholder.refresh(PageObj.Data.known_hosts.size)
	})
	// ?reg

	/**
	 * SAVE button listener.
	 * */
	// ¿reg
	PageObj.Poi.save_button.addEventListener("click", async () => {
		PageObj.Data.local_sitels = []
		PageObj.Data.known_hosts.forEach((e) => {
			PageObj.Data.local_sitels.push(new SiteLSEntry(e, 0, null))
		})

		console.log("local_sitels: ", PageObj.Data.local_sitels)



		// Ironically a little harder to read...
		// This can fail sometimes, maybe if there's js no elements.
		try {
			["entry-name", "entry-del-hb", "list-separator"] // All the classnames we're deleting.
				.forEach((n) => {
					Array.from(document.getElementsByClassName(n)).forEach((el) => {
						el.remove() // Removing them.
					})
				})

		} catch { }

		PageObj.Data.local_opts.whitelist = PageObj.Poi.GlobalsSection.Toggles.whitelist.checked
		PageObj.Data.local_opts.debug = PageObj.Poi.GlobalsSection.Toggles.debug.checked
		PageObj.Data.local_opts.trigger_happy = PageObj.Poi.GlobalsSection.Toggles.trigger_happy.checked

		// onion.
		PageObj.Data.local_opts.on_trigger.action = parseInt(PageObj.Poi.GlobalsSection.action_list.value)
		PageObj.Data.local_opts.on_trigger.redirect = PageObj.Poi.GlobalsSection.redirect_input.value

		// Saving the data
		await chrome.storage.sync.set({
			sitels: PageObj.Data.local_sitels,
			opts: PageObj.Data.local_opts
		})
		console.log("cloud_sitels: ", await chrome.storage.sync.get("sitels"))
		console.log("cloud_opts: ", await chrome.storage.sync.get("opts"))


		// rebuilding the sitelist.
		PageObj.Data.known_hosts.forEach((e) => {
			newEntry(e, false)
		})
	})
	// ?reg

	// Handles the switching tabs animation.
	// ¿reg
	// It really wasn't worth it to Global this, you could make the same case for the save-button, but whatever.
	const nav_buttons = document.getElementsByClassName("navbar-inv-radio");

	Array.from(nav_buttons).forEach((el) => {
		el.addEventListener("click", function() {
			document.body.classList = "";
			let _current_section = document.getElementsByClassName("content-show")[0];

			// Keeps track of our current section.
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
	// ?reg

	// Handles the dirtying of the page's state. To prevent people from quitting without saving on accident.
	//¿reg
	Array.from(document.getElementsByClassName("dirty")).forEach((el) => {
		el.addEventListener("click", () => {
			document.getElementById("stay-clean").classList.add("shine-when-dirty")
			PageObj.Data.is_dirty = true
		})
	})

	Array.from(document.getElementsByClassName("clean")).forEach((el) => {
		el.addEventListener("click", () => {
			document.getElementById("stay-clean").classList.remove("shine-when-dirty")
			PageObj.Data.is_dirty = false
		})
	})

	window.addEventListener("beforeunload", (win) => {
		if (PageObj.Data.is_dirty) {
			win.preventDefault()
			win.returnValue = ""
		}
	})
	// ?reg

	PageObj.Poi.Placeholder.presets.forEach((el) => {
		el.addEventListener("click", function() {
			PageObj.Data.known_hosts = new Set(JSON.parse(this.getAttribute("sitelist")))
			PageObj.Data.local_opts = JSON.parse(this.getAttribute("preset_opts"))

			PageObj.Data.known_hosts.forEach((v) => {
				newEntry(v, true)
			})

			PageObj.Poi.Placeholder.refresh(PageObj.Data.known_hosts.size)

			PageObj.Poi.GlobalsSection.action_list.value = PageObj.Data.local_opts.on_trigger.action
			PageObj.Poi.GlobalsSection.redirect_input.value = PageObj.Data.local_opts.on_trigger.redirect

			PageObj.Poi.GlobalsSection.Toggles.whitelist.checked = PageObj.Data.local_opts.whitelist
			PageObj.Poi.GlobalsSection.Toggles.debug.checked = PageObj.Data.local_opts.debug
			PageObj.Poi.GlobalsSection.Toggles.trigger_happy.checked = PageObj.Data.local_opts.trigger_happy
		})
	})

	/*
	 * Initial load of these toggles.
	 * */
	PageObj.Poi.GlobalsSection.action_list.value = opts.on_trigger.action
	PageObj.Poi.GlobalsSection.redirect_input.value = opts.on_trigger.redirect

	PageObj.Poi.GlobalsSection.Toggles.whitelist.checked = opts.whitelist
	PageObj.Poi.GlobalsSection.Toggles.debug.checked = opts.debug
	PageObj.Poi.GlobalsSection.Toggles.trigger_happy.checked = opts.trigger_happy

})
