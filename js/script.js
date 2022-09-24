const grid = document.getElementById("grid")
const input = document.getElementById("input")
const mapOccurrences = new Map()

const MAX_NUMBER_ROWS = 6
const MAX_NUMBER_CELL = 5

const secretWord = "CARRO"

let attempt = 1

function initGrid() {
	for (let rowIndex = 1; rowIndex <= MAX_NUMBER_ROWS; rowIndex++) {
		let row = document.createElement("div")
		row.setAttribute("class", "row")
		row.setAttribute("id", `row-${rowIndex}`)

		grid.appendChild(row)

		createCell(row, rowIndex)
	}
	countOccurrences()
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
	cell.style.animation = "size-up 0.1s linear"

	cell.textContent = letter
	nextLetter++
	setTimeout(() => {
		cell.style.animation = ""
	}, 100)
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

	countOccurrences()

	let row = document.getElementById(`row-${attempt}`)

	for (let pos = 0; pos < row.childNodes.length; pos++) {
		let cell = row.childNodes[pos]
		cell.style.backgroundColor = validateColor(cell, pos)
		cell.classList.add("inative")
		cell.classList.remove("row-active")

		let delay = 350 * pos
		setTimeout(() => {
			cell.style.animation = "spin2 0.35s linear"
		}, delay)
	}

	attempt++
	nextLetter = 0

	let nextRow = document.getElementById(`row-${attempt}`)
	for (let cell of nextRow.childNodes) {
		cell.classList.add("row-active")
		cell.classList.remove("inative")
	}
}

function countOccurrences() {
	for (let letter of secretWord)
		mapOccurrences.set(letter, secretWord.split(letter).length - 1)
}

function validateColor(cell, pos) {
	let color = "#312A2C"

	if (
		secretWord.match(cell.textContent) &&
		mapOccurrences.get(cell.textContent) > 0
	) {
		color = cell.textContent === secretWord[pos] ? "#3AA394" : "#D3AD69"

		mapOccurrences.set(
			cell.textContent,
			mapOccurrences.get(cell.textContent) - 1
		)
	}

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
		if (!found || pressedKey.length > 1) return
		else insertLetter(pressedKey.toUpperCase())
	},
	false
)

initGrid()
