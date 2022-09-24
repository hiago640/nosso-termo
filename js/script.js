const grid = document.getElementById("grid")
const input = document.getElementById("input")

const MAX_NUMBER_ROWS = 6
const MAX_NUMBER_CELL = 5

const secretWord = "URNAS"

let attempt = 1

function initGrid() {
	for (let rowIndex = 1; rowIndex <= MAX_NUMBER_ROWS; rowIndex++) {
		let row = document.createElement("div")
		row.setAttribute("class", "row")
		row.setAttribute("id", `row-${rowIndex}`)

		grid.appendChild(row)

		createCell(row, rowIndex)
	}
}

function createCell(row, rowIndex) {
	for (let i = 1; i <= MAX_NUMBER_CELL; i++) {
		let cell = document.createElement("div")
		cell.setAttribute("class", "cell")
		cell.setAttribute("id", `cell-${rowIndex}-${i}`)

		if (rowIndex != 1) cell.classList.add("inative")
		else cell.classList.add("row-active")

		row.appendChild(cell)
	}
}

let nextLetter = 0

function insertLetter(letter) {
	console.log(nextLetter)
	if (nextLetter >= 5) return

	let row = document.getElementById(`row-${attempt}`)

	let cell = row.childNodes[nextLetter]
	cell.textContent = letter
	nextLetter++
}

function deleteLetter() {
	let row = document.getElementById(`row-${attempt}`)

	nextLetter--
	let cell = row.childNodes[nextLetter]
	cell.textContent = ""
}

function checkGuess() {
	if (nextLetter !== 5) {
		alert("Não é uma palavra válida")
		return
	}

	let row = document.getElementById(`row-${attempt}`)
	for (let pos = 0; pos < row.childNodes.length; pos++) {
		let cell = row.childNodes[pos]
		cell.style.backgroundColor = validateColor(cell, pos)
		cell.classList.add("inative")
		cell.classList.remove("row-active")
	}

	attempt++
	nextLetter = 0

	let nextRow = document.getElementById(`row-${attempt}`)
	for (let cell of nextRow.childNodes) {
		cell.classList.add("row-active")
		cell.classList.remove("inative")
	}
}

function validateColor(cell, pos) {
	let color = ""

	if (cell.textContent === secretWord[pos]) color = "#3AA394"
	else if (secretWord.match(cell.textContent)) color = "#D3AD69"
	else color = "#312A2C"

	return color
}

document.addEventListener(
	"keydown",
	(e) => {
		if (attempt === 7) {
			return
		}

		let pressedKey = String(e.key)

		if (pressedKey === "Enter") {
			checkGuess()
			return
		}

		if (pressedKey === "Backspace" && nextLetter !== 0) {
			deleteLetter()
			return
		}

		let found = pressedKey.match(/[a-z]/gi)
		if (!found || found.length > 1) return
		else insertLetter(pressedKey.toUpperCase())
	},
	false
)

initGrid()
