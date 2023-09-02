let restartBtn = document.getElementById('restartBtn'); 
let PlayerText = document.getElementById('PlayerText');
let boxes = Array.from(document.getElementsByClassName('box'));
let winningindication = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    console.log(e.target);
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
        if (playerWon() !== false) { 
            PlayerText = `${currentPlayer} has Won!`;
            let winningBlocks = playerWon(); 

            winningBlocks.map(box => boxes[box].style.backgroundColor = winningindication); 
            return;
        }
    }
}

const winCombos = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerWon() { 
    for (const combo of winCombos) {
        let [a, b, c] = combo; 

        if (spaces[a] && spaces[b] === spaces[a] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    })

    currentPlayer = X_TEXT;
    PlayerText.textContent = ''; 
}

startGame();
