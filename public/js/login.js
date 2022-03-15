const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputs = event.target.querySelectorAll("input");
	const errorLabel = event.target.querySelector("label#error");
	if (!inputs[0].value || !inputs[1].value) {
        errorLabel.classList.add("errorLabel");
		errorLabel.innerHTML = "<span>Error:</span> Vul wat in!";
		inputs.forEach(element => {
			element.classList.add("fouteInput");
		});
	} else {
		event.target.submit();
	}
});

