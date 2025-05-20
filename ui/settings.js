function addEntry(list_table, name) {

	/* Creating the new entry. */
	let new_entry = list_table.insertRow()
	let site = new_entry.insertCell()
	let button = new_entry.insertCell()
	let button_element = document.createElement("input")
	site.textContent = name
	new_entry.id = site.textContent

	button_element.setAttribute("type", "button")
	button_element.setAttribute("value", "-")
	button_element.setAttribute("class", "opt_button")
	button_element.setAttribute("ref", name)

	/* Adding it to the list. */
	button.appendChild(button_element)
	button_element.addEventListener("click", function (e) {
		document.getElementById(this.getAttribute("ref")).remove()
	})

}

function saveSettings() {
	console.log("TODO: saveSettings Implementation")
}

async function loadSettings() {
	console.log("TODO: loadSettings Implementation")
}

async function loadSiteList() {
	console.log("TODO: loadSettings Implementation")
}

// Entry point
async function main() {
	const settings = await loadSettings()

	// Important UI Stuff
	// table that shows the site list
	const tableref = document.getElementById("list_area").getElementsByTagName('tbody')[0]
	// Addsite button.
	const button = document.getElementById("addsite-button");

	button.addEventListener("click", function (e) {

		const sitehostname = document.getElementById("addsite-text").value

		// Input sanitizing
		if (sitehostname == "") {
			return
		}

		// Checking if the element already exists.

		// TODO: Change implementation, use a Set() and pass that to addEntry(), 
		// then rebuild the whole table each time that function is called.
		for (let i = 0; i < tableref.rows.length; i++) {
			let cur_row = tableref.rows[i];
			console.log(cur_row.textContent)
			if (cur_row.textContent == sitehostname) {
				return
			}
		}



		/* Creating new table element. */
		addEntry(tableref, sitehostname)

	})
}

// Loading the entry point after DOM loads.
document.addEventListener("DOMContentLoaded", main())