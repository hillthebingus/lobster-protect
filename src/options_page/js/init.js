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
	} else {
		n_entry_name.classList = "entry-name " + entry_name
	}
	PageObj.Poi.SiteList.container.appendChild(n_entry_name)

	// The delete option, later the flexbox with the other options TODO
	const options_label = document.createElement("label")
	options_label.classList = "entry-del-hb " + entry_name

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

		PageObj.Data.known_hosts.delete(del_ref)
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
		sitels: [
			{
				hostname: "Hellow"
			},
			{
				hostname:"thisshouldbepermanent."
			},
			{
				hostname:"Anythingafterthisshouldbetemporaryuntilwerebuildit."
			},
		]
	})

	// Building the initial known_hosts
	sitels.forEach(e => {
		// Making known the hosts in the storage.
		PageObj.Data.known_hosts.add(e.hostname)
	});

	// Manually adding our known hosts into the sitelist..
	PageObj.Data.known_hosts.forEach((e) => {
		newEntry(e, false)
	})

})
