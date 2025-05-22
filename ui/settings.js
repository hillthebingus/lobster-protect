function rebuildTable(list_table, set) {

	// Clearing the table.
	for (let i = list_table.rows.length - 1; i > 0; i--) {
		list_table.deleteRow(i)
	}

	/* Iterating over the set, creating a new entry after each one. */
	set.forEach(entry => {

		let new_entry = list_table.insertRow()
		let site = new_entry.insertCell()
		let options = new_entry.insertCell()
		let button_element = document.createElement("input")

		site.textContent = entry
		new_entry.id = entry

		button_element.setAttribute("type", "button")
		button_element.setAttribute("value", "-")
		button_element.setAttribute("class", "opt_button")
		button_element.setAttribute("ref", entry)

		/* Adding it to the list. */
		options.appendChild(button_element)
		button_element.addEventListener("click", function (e) {
			document.getElementById(this.getAttribute("ref")).remove()
		})
	});

}


// Entry point
async function main() {
	let { _sites } = await chrome.storage.local.get("sites")
	let sites = new Set(_sites)
	console.log(sites)

	// table that shows the site list
	const tableref = document.getElementById("list_area").getElementsByTagName('tbody')[0]
	const button = document.getElementById("addsite-button")

	button.addEventListener("click", function (e) {
		const sitehostname = document.getElementById("addsite-text").value

		// Input sanitizing
		if (sitehostname == "") {
			return
		}

		// This will naturally check if the table already contains this element.
		sites.add(sitehostname)

		/* Rebuilding the table */
		rebuildTable(tableref, sites)

	})
}

// Loading the entry point after DOM loads.
document.addEventListener("DOMContentLoaded", main())