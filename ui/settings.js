

const button = document.getElementById("addsite-button");
button.addEventListener("click", function (e) {

	/* Creating new table element. */
	const list_table = document.getElementById("list_area").getElementsByTagName('tbody')[0];

	let new_entry = list_table.insertRow()
	let site = new_entry.insertCell()
	let button = new_entry.insertCell()
	let button_element = document.createElement("input")
	site.textContent = document.getElementById("addsite-text").value
	new_entry.id = site.textContent

	button_element.setAttribute("type", "button")
	button_element.setAttribute("value", "-")
	button_element.setAttribute("class", "opt_button")
	button_element.setAttribute("id", document.getElementById("addsite-text").value)

	button.appendChild(button_element)

})