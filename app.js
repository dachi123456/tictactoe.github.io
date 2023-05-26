const chooseOne = document.querySelectorAll('.select-x-or-o')
const place = document.querySelector('section')
const squares = place.querySelectorAll('div')
const whosTurn = document.querySelector('.whos-turn')
const xScore = document.querySelector('.x-score')
const drawScore = document.querySelector('.draw-score')
const oScore = document.querySelector('.o-score')
const lobby = document.querySelector('.lobby')
const vsPlayer = document.querySelector('.vs-player')
const vsComp = document.querySelector('.vs-cpu')
const field = document.querySelector('.field')

let currentPlayer = 'X'
chooseOne.forEach(el => {
    el.addEventListener('click', () => {
      chooseOne.forEach(div => {
        if (div !== el) {
          div.classList.remove('active');
        }
      });
      
      el.classList.toggle('active');
      if(el.classList.contains('active')){
        vsPlayer.addEventListener('click',() => {
          lobby.style.display = 'none'
          field.style.display = 'block'
        })
      }
    });
  });

  
vsPlayer.addEventListener('click', () => {
  if(chooseOne[0].classList.contains('active') || chooseOne[1].classList.contains('active')){
    squares.forEach((el) =>{
      if(!el.textContent){
        el.addEventListener('click', () => {
          handleSquareClick(el)
        })
      }
    })
    
  }
})
whosTurn.classList.add('x-turn')

//vs player
function handleSquareClick(square) {
  if (square.textContent === '') { 
    if (!square.classList.contains('background-x') && !square.classList.contains('background-o')) {
      
      square.classList.add(currentPlayer === 'X' ? 'background-x' : 'background-o');
      
      togglePlayer()
      updateWhosTurn()
      checkWin()
      checkDraw()
      
    }
  }
  
}
const handleSquareClickVsComp = (square) => {
  if (square.textContent === '') { 
    if (!square.classList.contains('background-x') && !square.classList.contains('background-o')) {
      
      square.classList.add(currentPlayer === 'X' ? 'background-x' : 'background-o');
      
      togglePlayer()
      updateWhosTurn()
      checkWin()
      checkDraw()
      computerMove()
    }
  }
  
}

//vs computer
function computerMove() {
  const emptySquares = Array.from(squares).filter(square => !square.classList.contains('background-x') && !square.classList.contains('background-o'));
  if(emptySquares.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const randomSquare = emptySquares[randomIndex]
    randomSquare.classList.add(currentPlayer === 'X' ? 'background-x' : 'background-o');
    togglePlayer();
    updateWhosTurn();
    checkWin();
    checkDraw();
  }
}

vsComp.addEventListener('click', () => {
    if(chooseOne[0].classList.contains('active') || chooseOne[1].classList.contains('active')){
      lobby.style.display = 'none'
      field.style.display = 'block'
      
        squares.forEach((el) =>{
          if(!el.textContent){
            el.addEventListener('click', () => {
              handleSquareClickVsComp(el)
            })
          }
        })
        
      
    }
})


function togglePlayer(){
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
}

function updateWhosTurn(){
    whosTurn.className = 'o-turn'
    const turnIconClass = currentPlayer === "X" ? "x-turn" : "o-turn";
    whosTurn.className = `whos-turn ${turnIconClass}`;
  
}

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const board = Array.from(squares)
// xScore.textContent = 0
// drawScore.textContent = 0
// oScore.textContent = 0

const xWon = document.querySelector('.x-won')
const oWon = document.querySelector('.o-won')

function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      board[a].classList.contains("background-x") &&
      board[b].classList.contains("background-x") &&
      board[c].classList.contains("background-x")
    ) {
      
      xWon.style.display = 'block'
      place.classList.add('blur')
    
      
      
    } else if (
      board[a].classList.contains("background-o") &&
      board[b].classList.contains("background-o") &&
      board[c].classList.contains("background-o")
    ) {
      
      oWon.style.display = 'block'
      place.classList.add('blur')
      
    }
  }
  
}

const drawAlert = document.querySelector('.draw-alert')
function checkDraw() {
  if (board.every(square => square.classList.contains("background-x")
   || square.classList.contains("background-o"))) {

    drawAlert.style.display = 'block'
    place.classList.add('blur')
    
  }
}



//next round
const quit = document.querySelectorAll('.quit')
const nextRound = document.querySelectorAll('.next-round')

quit.forEach((el) => {
  el.addEventListener('click', updateEverything)
  el.addEventListener('click', () => {
  lobby.style.display = 'flex'
})
})
nextRound.forEach((e) => {
  e.addEventListener('click', updateField)
  e.addEventListener('click', () => {
  xWon.style.display = 'none'
  oWon.style.display = 'none'
  drawAlert.style.display = 'none'
  
})

})
//restart game
const restartIcon = document.querySelector('.restart')
const restGameDiv = document.querySelector('.restart-game')
const cancel = document.querySelector('.cancel')
const restGame = document.querySelector('.restart-btn')

restartIcon.addEventListener('click', () => {
  restGameDiv.style.display = 'block'
})

cancel.addEventListener('click', () => {
  restGameDiv.style.display = 'none'
})

restGame.addEventListener('click', () => {
  currentPlayer = 'X'
  squares.forEach((e) => {
    e.classList.remove('background-x')
    e.classList.remove('background-o')
  })
  
})
restGame.addEventListener('click', () => {
  lobby.style.display = 'flex'
})
restGame.addEventListener('click', updateEverything)
  

function updateEverything(){
  currentPlayer = 'X'
  squares.forEach((e) => {
    e.classList.remove('background-x')
    e.classList.remove('background-o')
  })
  restGameDiv.style.display = 'none'
  drawScore.textContent = 0
  oScore.textContent = 0
  xScore.textContent = 0
  field.style.display = 'none'
  xWon.style.display = 'none'
  drawAlert.style.display = 'none'
  oWon.style.display = 'none'
  place.classList.remove('blur')
  updateWhosTurn()
}

function updateField(){
  currentPlayer = 'X'
  squares.forEach((e) => {
    e.classList.remove('background-x')
    e.classList.remove('background-o')
  })
  place.classList.remove('blur')
  whosTurn.classList.remove('o-turn')
  whosTurn.classList.add('x-turn')
}

