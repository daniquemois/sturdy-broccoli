// Progressive Enhancement 

// Via queryselector word er een form opgehaald
const form = document.querySelector("form");

// Bij submit zal hij de volgende dingen checken
form.addEventListener("submit", (event) => {
	// als alles niet ingevuld is zorg dit dat de submit niet door gaat
	event.preventDefault();
	// Hier worden al de submits opgehaald en ook de errorlabel
	const inputs = event.target.querySelectorAll("input");
	const errorLabel = event.target.querySelector("label#error");
	// als de inputs geen value hebben maakt hij een class aan genaamd errorLabel en zet hij hier tekst in.
	if (!inputs[0].value || !inputs[1].value) {
        errorLabel.classList.add("errorLabel");
		errorLabel.innerHTML = "<span>Error:</span> Vul wat in!";
		// Voor elke input voegt hij een class toe.
		inputs.forEach(element => {
			element.classList.add("fouteInput");
		});
	// En als er wel input is submit hij het formulier.
	} else {
		event.target.submit();
	}
});

