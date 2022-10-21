const WORDS = [
	"IMBIGO",
	"INZAME",
	"PREDA",
	"MINDIGO",
	"BRABO",
	"FRANHA",
	"ADEVOGADO",
	"VRIDO",
	"PINEU",
	"BARUIO",
	"BARAIO",
	"QUEJO",
	"CARAIO",
	"MORTANDELA",
	"IORGUTE",
	"GUSPE",
	"ASTERISTICO",
	"CRONE",
	"CROFE",
	"BUJAO",
	"FOSFRO",
	"BOIANO",
	"AVOA",
	"FLAUDA",
	"POBREMA",
	"CARDACO",
	"CELEBRO",
	"BILETE",
	"CABEIO",
	"ARVRE",
	"DROBAR",
	"PREFUME",
	"MUINTO",
	"ABRIDO",
	"OREIA",
	"PIRULA",
	"BRUSINHA",
	"SAGUADO",
	"PAIACO",
	"TRUCE",
	"ABROBA",
	"ARROIZ",
	"BICABORNATO",
	"FAZESSE",
	"ARVRE",
	"GALFO",
	"REJUVELHECER",
	"INGREJA",
	"LARGATA",
	"LARGATIXA",
	"TEVELISAO",
	"PIRUCA",
	"MOLUSCULO",
	"LOSANGULO",
	"COCRANTE",
	"COCRETE",
	"DIBRE",
	"INGUAL",
	"PIRULA",
	"BISORO",
	"TOCHICO",
	"CISNEI",
	"CABELELEIRO",
	"CARDACO",
	"SOMBRANCELHA",
	"CONHECIDENCIA",
	"GOGUMELO",
	"ENTRETERIMENTO",
	"FILGO",
	"INDIOTA",
	"MENAS",
	"TOMARE",
	"SEJE",
	"PROVALECER",
	"ESTEJE",
	"EXCESSAO",
	"TRABISSEIRO",
	"TAUBA",
	"MECHER",
	"ENXER",
	"MUNDIÇA",
	"FISSO",
	"ARREDA",
]

const grid = document.getElementById("grid")
const input = document.getElementById("input")
const mapOccurrences = new Map()
const inputLetters = []

const date = new Date()

let secretWord

do {
	secretWord = WORDS[Math.floor(Math.random() * WORDS.length)]
} while (secretWord.length > 7)

const MAX_NUMBER_ROWS = numberAttempts()
let MAX_NUMBER_CELL = secretWord.length

let attempt = 1

function numberAttempts() {
	let minumumAttempt = 7

	return Math.round(
		secretWord.length <= 7
			? minumumAttempt
			: minumumAttempt / 2 + secretWord.length / 2 - 1
	)
}

function initGrid() {
	for (let rowIndex = 1; rowIndex <= MAX_NUMBER_ROWS; rowIndex++) {
		let row = document.createElement("div")
		row.setAttribute("class", "row")
		row.setAttribute("id", `row-${rowIndex}`)

		grid.appendChild(row)

		createCell(row, rowIndex)

		if (rowIndex === 1) row.childNodes[0].classList.add("edit")
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

let letterIndex = 0

function insertLetter(letter) {
	if (letterIndex >= MAX_NUMBER_CELL) return

	let row = document.getElementById(`row-${attempt}`)

	let cell = row.childNodes[letterIndex]
	cell.style.animation = "size-up 0.1s linear"

	if (cell.textContent != "") inputLetters.splice(letterIndex, 1)

	cell.textContent = letter
	cell.classList.remove("edit")

	inputLetters.splice(letterIndex, 0, letter)

	letterIndex++

	setTimeout(() => {
		cell.style.animation = ""
	}, 100)

	if (letterIndex !== MAX_NUMBER_CELL)
		row.childNodes[letterIndex].classList.add("edit")

	if (
		letterIndex === MAX_NUMBER_CELL &&
		inputLetters.length !== MAX_NUMBER_CELL
	) {
		let unfilledCells = []
		let i = 0
		for (cell of row.childNodes) {
			if (cell.textContent === "") {
				unfilledCells.push(cell)
				break
			}
			i++
		}

		if(unfilledCells.length > 0) {
			unfilledCells[0].classList.add("edit")
			letterIndex = i
		}
	}
}

let isChecking = false

function deleteLetter() {
	if (!isChecking) {
		let row = document.getElementById(`row-${attempt}`)

		if (letterIndex === 0 && row.childNodes[letterIndex].textContent === '') {
			return
		}

		if (letterIndex === MAX_NUMBER_CELL) {
			letterIndex--
			let cell = row.childNodes[letterIndex]
			cell.textContent = ""
			cell.classList.add("edit")
			inputLetters.splice(letterIndex, 1)

			return
		}

		if (row.childNodes[letterIndex].textContent === "") {
			row.childNodes[letterIndex].classList.remove("edit")
			letterIndex--

			let cell = row.childNodes[letterIndex]
			cell.textContent = ""
			cell.classList.add("edit")
			inputLetters.splice(letterIndex, 1)
		} else {
			row.childNodes[letterIndex].textContent = ""
			inputLetters.splice(letterIndex, 1)
		}
	}
}

function checkGuess() {
	if (inputLetters.length !== MAX_NUMBER_CELL) {
		toastr.error("Não é uma palavra válida.")
		isChecking = false
		return
	}

	isChecking = true

	countOccurrences()

	let row = document.getElementById(`row-${attempt}`)

	let correctLetters = 0
	for (let pos = 0; pos < secretWord.length; pos++)
		if (secretWord[pos] === inputLetters[pos]) correctLetters++

	validadeCorrectWord(correctLetters)

	for (let pos = 0; pos < row.childNodes.length; pos++) {
		let cell = row.childNodes[pos]
		cell.classList.add("inative")
		cell.classList.remove("row-active")
		cell.classList.remove("edit")

		let delay = 350 * pos
		setTimeout(() => {
			let letterColor = validateColor(cell, pos)
			cell.style.backgroundColor = letterColor
			keyBoardColor(cell.textContent, letterColor)
			cell.style.animation = "spin2 0.35s linear"
		}, delay)
	}

	correctLetters = 0
}

let letterCorrectList = []
function keyBoardColor(letter, color) {
	for (const elem of document.getElementsByClassName("keyboard-button")) {
		if (elem.textContent.toUpperCase() === letter.toUpperCase() && !letterCorrectList.includes(letter) ) {
			let oldColor = elem.style.backgroundColor

			if (oldColor === "#3AA394") {
				return
			}

			if (oldColor === "rgb(211, 173, 105)" && color !== "#3AA394") {
				return
			}

			elem.style.backgroundColor = color
			if (color === "#3AA394") letterCorrectList.push(letter)

			break
		}
	}
}

function validadeCorrectWord(correctLetters) {
	setTimeout(() => {
		if (correctLetters === secretWord.length) {
			toastr.success("Cê acertou a palavra do dia fioteeee!")
			return
		} else {
			attempt++
			letterIndex = 0

			if (attempt < MAX_NUMBER_ROWS + 1) {
				let nextRow = document.getElementById(`row-${attempt}`)
				nextRow.childNodes[0].classList.add("edit")

				for (let cell of nextRow.childNodes) {
					cell.classList.add("row-active")
					cell.classList.remove("inative")
				}

				inputLetters.length = 0
			} else {
				toastr.error("Você não conseguiu acertar a palavra do dia!")
				toastr.info(`A Palavra correta é: "${secretWord}"`)
				return
			}
		}
		isChecking = false
	}, 350 * secretWord.length)
}

function countOccurrences() {
	for (let letter of secretWord)
		mapOccurrences.set(letter, secretWord.split(letter).length - 1)
}

function validateColor(cell, pos) {
	let color = "#312A2C"

	if (secretWord.match(cell.textContent) && mapOccurrences.get(cell.textContent) > 0) {
		color = cell.textContent === secretWord[pos] ? "#3AA394" : "#D3AD69"

		mapOccurrences.set(cell.textContent, mapOccurrences.get(cell.textContent) - 1 )
	}

	return color
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
	const target = e.target

	if (!target.classList.contains("keyboard-button")) {
		return
	}
	let key = target.textContent

	if (key === "Del") {
		key = "Backspace"
	}

	document.dispatchEvent(new KeyboardEvent("keydown", { key: key }))
})

document.addEventListener(
	"keydown",
	(e) => {
		let pressedKey = String(e.key)

		console.log(inputLetters);

		if (pressedKey === "Enter") {
			if (!isChecking) checkGuess()
			return
		}

		if (pressedKey === "Backspace" && letterIndex >= 0) {
			deleteLetter()
			return
		}

		keyArrows(pressedKey)

		let found = pressedKey.match(/[a-z]/gi)
		if (!found || pressedKey.length > 1) return
		else {
			if (!isChecking) insertLetter(pressedKey.toUpperCase())
		}
	},
	false
)

document.addEventListener("click", (e) => {
	let row = document.getElementById(`row-${attempt}`)

	if (e.srcElement.id.split("-")[0] === "cell" && e.srcElement.id.split("-")[1] == attempt) {
		
		let id = e.srcElement.id.split("-")[2]
		if (id != 0) {
			row.childNodes[letterIndex].classList.remove("edit")
			letterIndex = id - 1
			row.childNodes[letterIndex].classList.add("edit")
		}
	}
})

function keyArrows(pressedKey) {
	let row = document.getElementById(`row-${attempt}`)

	if (pressedKey === "ArrowLeft") {
		if (letterIndex > 0) {
			if (letterIndex !== MAX_NUMBER_CELL)
				row.childNodes[letterIndex].classList.remove("edit")

			letterIndex--

			row.childNodes[letterIndex].classList.add("edit")
		}
	} else if (pressedKey === "ArrowRight" || pressedKey === " ") {
		if (letterIndex !== MAX_NUMBER_CELL) {
			if (letterIndex + 1 !== MAX_NUMBER_CELL) {
				row.childNodes[letterIndex].classList.remove("edit")
				letterIndex++
				row.childNodes[letterIndex].classList.add("edit")
			}
		}
	} else return
}

initGrid()
