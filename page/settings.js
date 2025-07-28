/* TODO
 * Fix RebuildTable
 *
 * It's not working with the new sitels format.
 */
// rebuildTable(site_container, set)
// Rebuilds the site list so it matches the set. Trigger this every time the addsite button is pressed.
//¿reg
function rebuildTable(site_container, set) {
	// Clearing the table.
	for (let i = list_table.rows.length - 1; i > 0; i--) {
		list_table.deleteRow(i);
	}

	/* Iterating over the set, creating a new entry after each one. */
	set.forEach((entry) => {
		// Creating the entry
		let new_entry = list_table.insertRow();
		let site = new_entry.insertCell();
		let options = new_entry.insertCell();
		let button_element = document.createElement("input");

		site.textContent = entry;
		new_entry.id = entry;

		// Affecting the button_element
		button_element.setAttribute("type", "button");
		button_element.setAttribute("value", "-");
		button_element.setAttribute("class", "opt_button");
		button_element.setAttribute("ref", entry);

		/* Adding it to the list. */
		options.appendChild(button_element);

		// Making the delete button do stuff
		button_element.addEventListener("click", function() {
			document.getElementById(this.getAttribute("ref")).remove();
			set.delete(this.getAttribute("ref"));
		});
	});
}
//?reg

// Handles the switch animation
//¿reg
function handleAnimationSwitch() {
	document.body.classList = "";
	let _current_section = document.getElementsByClassName("content-show")[0];

	_current_section.classList.remove("content-show");
	_current_section.classList.add("content-hide");

	document
		.getElementById(this.getAttribute("ref"))
		.classList.add("content-show");
	document
		.getElementById(this.getAttribute("ref"))
		.classList.remove("content-hide");
}
//?reg

// Entry point
//¿reg
async function main() {
	/* Making the navigation bar functional */
	const nav_buttons = document.getElementsByClassName("navbar-inv-radio");
	Array.from(nav_buttons).forEach((el) => {
		el.addEventListener("click", handleAnimationSwitch);
	});

	// Get the site list container.
	const sitelist_container = document.getElementById("sitelist-container");
	const sitelist_placeholder = document.getElementById(
		"sitelist-placeholder-container",
	);

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
document.addEventListener("DOMContentLoaded", main);
