const grid = document.getElementById("grid");
const input = document.getElementById("input");

const MAX_NUMBER_ROWS = 6;
const MAX_NUMBER_CELL = 5;

let attempt = 1;

function initGrid() {
	for (let rowIndex = 1; rowIndex <= MAX_NUMBER_ROWS; rowIndex++) {
		let row = document.createElement("div");
		row.setAttribute("class", "row");
		row.setAttribute("id", `row-${rowIndex}`);

		grid.appendChild(row);

		createCell(row, rowIndex);
	}
}

function createCell(row, rowIndex) {
	for (let i = 1; i <= MAX_NUMBER_CELL; i++) {
		let cell = document.createElement("div");
		cell.setAttribute("class", "cell");
		cell.setAttribute("id", `cell-${rowIndex}-${i}`);

		if (rowIndex != 1) cell.setAttribute("class", "cell inative");

		row.appendChild(cell);
	}
}

initGrid();
let nextLetter = 0;

function insertLetter(letter) {
	let row = document.getElementById(`row-${attempt}`);
	console.log("entro");

	let cell = row.childNodes[nextLetter];
	cell.textContent = letter;
	nextLetter++;
}

/*
function insertLetter(keyPressed) {
	if (nextLetter === MAX_NUMBER_CELL) {
		attempt++;
		nextLetter = 0;
	}

	if (attempt > MAX_NUMBER_ROWS) return;

	let row = document.getElementById(`row-${attempt}`);
	let cell;

	if (keyPressed == "Backspace" || keyPressed == "Delete") {
		cell = row.childNodes[nextLetter].classList.remove("ative");

		if (nextLetter != 0) {
			nextLetter--;
			cell = row.childNodes[nextLetter];
			cell.textContent = "";
			cell.classList.add("ative");
		}
	} else {
		cell = row.childNodes[nextLetter];
		cell.classList.add("ative");
		row.childNodes[nextLetter].textContent = keyPressed.toUpperCase();
		//cell.classList.remove('ative')
		nextLetter++;
	}
}*/
document.addEventListener("keyup", (e) => {
	
		if (attempt === 7) {
			return;
		}

		let pressedKey = String(e.key)

		if (pressedKey === "Enter") {
			//checkGuess()
			return;
		}

		if (pressedKey === "Backspace") {
			//deleteLetter()
			return;
		}

		let found = pressedKey.match(/[a-z]/gi)
		if (!found || found.length > 1) {
			return
		} else {
			insertLetter(pressedKey)
		}
	},
	false
);
