// Hier halen we de spreadsheet op
const CONFIG = {
	// dit is alle info die nodig is om de spreadhsheet op te halen
	spreadsheetId: '1F3DBuLeR1-vDdglypceSc6ci6vNgcQ15R2Y33Q0kXuo',
	spreadsheetName: 'Blad1'
}

// Dit haalt de API link op
async function getData() {
	let res = await fetch(`https://opensheet.elk.sh/${CONFIG.spreadsheetId}/${CONFIG.spreadsheetName}`)
	return await res.json();
}

// Hier halen we de gegevens op en hiermee kunnen we ook stijlen
function gegevensOphalen(data) {
	let main = document.querySelector('main');
	
	console.log(data);
	// we willen dat de data verschillende items bevat
	data.forEach(item => {
		// de let zorgt ervoor dat het element aangemaakt word
		let container = document.createElement('article');
		
		let continent = document.createElement('h2');
		continent.textContent = item['Continent'];
		
		let land = document.createElement('h3');
		land.textContent = item['Land'];
		
		let tijdzone = document.createElement('p');
		tijdzone.textContent = item['Tijdzone'];
		
		container.appendChild(continent);
		container.appendChild(land);
		container.appendChild(tijdzone);

		main.appendChild(container);
	})

}

if(document.querySelector('main')) {
	getData()
	.then(data => {	
        gegevensOphalen(data);
	})
}

