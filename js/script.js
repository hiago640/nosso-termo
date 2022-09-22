const grid = document.getElementById('grid')
const input = document.getElementById('input')

const MAX_NUMBER_ROWS = 6
const MAX_NUMBER_CELL = 5

function initGrid() {

	for (let rowIndex = 1; rowIndex <= MAX_NUMBER_ROWS; rowIndex++) {
		let row = document.createElement('div')
		row.setAttribute('class', 'row')	
		row.setAttribute('id', `row-${rowIndex}`)
		
		grid.appendChild(row)

		createCell(row, rowIndex)
	}

}

function createCell(row, rowIndex) {

	for (let i = 1; i <= MAX_NUMBER_CELL; i++) {
		let cell = document.createElement('div')
		cell.setAttribute('class', 'cell')	
		cell.setAttribute('id', `cell-${rowIndex}-${i}`)	
		
		if(rowIndex != 1)
			cell.setAttribute('class', 'cell inative')

		row.appendChild(cell)
	}
	
}

initGrid()

function mostra() {
	let inputWord = input.value.toUpperCase()

	for (let attempts = 1; attempts <= MAX_NUMBER_ROWS; attempts++) {
		let row = document.getElementById(`row-${attempts}`)
		
		if(attempts == 1){
			for(let index = 1; index <= MAX_NUMBER_CELL; index++){
				
				row.childNodes[index-1].textContent = inputWord[index-1]
				
			}

		}

		
	}
	input.value = ""
}
