/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/



/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/



/*----------------------------- Event Listeners -----------------------------*/


let turn="X"
let winner=false
let tie=false

let board = ['', '', '', '', '', '', '', '', '']

let squareIndex

const squareEls=document.querySelectorAll(".sqr")
const messageEl=document.querySelector('#message')


function init(){
    board = ['', '', '', '', '', '', '', '', '']
    turn="X"
    winner=false
    tie=false
    render()
}
function updateBoard(){
    board.forEach((cell, index) => {
        squareEls[index].innerText=cell;
    })
}

function updateMessage(){
    if(winner==false && tie==false)
        messageEl.innerText=`it's ${turn}'s turn`
    if(winner==false && tie==true)
        messageEl.innerText='Tie game'
    if(winner!=false && tie==false){
        messageEl.innerText=`${winner} wins!`
    }
}
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
function render(){
    updateBoard();
    updateMessage();
}
function handleClick(target){
     if(target.innerText=="O" || target.innerText=="X"|| winner!=false)
         return;
    squareIndex=Number(target.id)
    //console.log(squareIndex)
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
    
}
function placePiece(index){
    board[index]=turn
}

function checkForWinner() {
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (
      board[a] != '' &&
      board[a] == board[b] &&
      board[a] == board[c]
    ) {
      winner = board[a];
    }
  });
}


function checkForTie(){
    if(winner!=false)
        return;
    if(board.includes(''))
        tie=false;
    else{
        tie=true;
    }
}
function switchPlayerTurn(){
    if(winner!=false)
        return;
    else{
        if(turn=='X')
            turn='O'
        else{
            turn='X'
        }
    }
}

squareEls.forEach((square)=>
    {
        square.addEventListener("click",(event)=> handleClick(event.target))
    }
)

const resetBtnEl = document.createElement('button');
resetBtnEl.id = 'reset';
resetBtnEl.innerText = 'Reset';
document.body.appendChild(resetBtnEl);

resetBtnEl.addEventListener('click', init);

init();

