const text = document.createElement('p')

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;

setModal = ()=> {
    const div = document.createElement('div')
    div.setAttribute('class', 'modal')
    document.body.append(div)

	
	div.append(text)

    const restartButton = document.createElement('button')
    restartButton.innerText = "Restart"
    div.append(restartButton)

	restartButton.addEventListener('click', ()=>{
		div.style.display ="none";
		handleRestartGame();
	
	});
}


handleCellPlayed = (clickedCell, clickedCellIndex) => {
	gameState[clickedCellIndex] = currentPlayer;
	clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

handleResultValidation = () => {

	let roundWon = false;

	for (let i = 0; i <= 7; i++) {
		const winCondition = winningConditions[i];
		let a = gameState[winCondition[0]];
		let b = gameState[winCondition[1]];
		let c = gameState[winCondition[2]];
		if (a === '' || b === '' || c === '') {
			continue;
		}
		if (a === b && b === c) {
			roundWon = true;
			break
		}
	}

	if (roundWon) {
		setModal()
		text.innerHTML = winningMessage();
		gameActive = false;
		return;
	}

	let roundDraw = !gameState.includes("");
	if (roundDraw) {
		setModal()
		text.innerHTML = drawMessage();
		gameActive = false;
		return;
	}

	handlePlayerChange();
}

handlePlayerChange = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

handleCellClick = (clickedCellEvent) => {  
	const clickedCell = clickedCellEvent.target;

	const clickedCellIndex = parseInt(
		clickedCell.getAttribute('data-cell-index')
	);

	if (gameState[clickedCellIndex] !== "" || !gameActive) {
		return;
	}

	handleCellPlayed(clickedCell, clickedCellIndex);
	handleResultValidation();
}

handleRestartGame = () => {
	gameActive = true;
	currentPlayer = "X";
	gameState = ["", "", "", "", "", "", "", "", ""];
	document.querySelectorAll('.cell')
	.forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
