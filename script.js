const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
const gameOver = document.querySelector('.game-over')

const leftArrow = document.querySelector('.arrow-left')
const rightArrow = document.querySelector('.arrow-right')
const upArrow = document.querySelector('.arrow-up')
const downArrow = document.querySelector('.arrow-down')

let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 20;
let speed = 400
let speedCoef = 0.9
let timerId = 0
let foodIndex = 0
let score = 0



// ------------------------- GRID INIT --------------------------

function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
  }
}

createGrid()

// ------------------------ START INIT ----------------------------
function startGame() {
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  squares[foodIndex].classList.remove('food')
  gameOver.classList.remove("active")
  clearInterval(timerId)
  currentSnake = [2, 1, 0]
  currentSnake.forEach(index => squares[index].classList.add('snake'))
  direction = 1
  speed = 400
  speedCoef = 0.9
  timerId = 0
  score = 0
  generateFood()
  timerId = setInterval(move, speed)
}

startBtn.addEventListener('click', startGame)


// ------------------------ SNAKE INIT ---------------------------
currentSnake.forEach(index => squares[index].classList.add('snake'))


// ----------------------- MOVING STUFF --------------------------
function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || // bottom wall
    (currentSnake[0] % width === width - 1 && direction === 1) || // right wall
    (currentSnake[0] % width === 0 && direction === -1) || // left wall
    (currentSnake[0] - width < 0 && direction === -width) || // top wall
    squares[currentSnake[0] + direction].classList.contains('snake')
  ) {
    console.log("yes")
    gameOver.classList.add("active")
    return clearInterval(timerId)
  }

  const tail = currentSnake.pop()
  squares[tail].classList.remove('snake')

  currentSnake.unshift(currentSnake[0] + direction)

  if (currentSnake[0] === foodIndex) {
    currentSnake.push(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')
    squares[foodIndex].classList.remove('food')
    generateFood()
    score++
    scoreDisplay.textContent = score
    clearInterval(timerId)
    speed = speed * speedCoef
    timerId = setInterval(move, speed)
  }

  squares[currentSnake[0]].classList.add('snake')


}

leftArrow.addEventListener("click", function () {
  direction = -1
})
rightArrow.addEventListener("click", function () {
  direction = 1
})
upArrow.addEventListener("click", function () {
  direction = -width
})
downArrow.addEventListener("click", function () {
  direction = +width
})

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Ne devrait rien faire si l'??v??nement de la touche ??tait d??j?? consomm??.
  }

  switch (event.key) {
    case "ArrowDown":
      // Faire quelque chose pour la touche "fl??che vers le bas" press??e.
      direction = +width
      break;
    case "ArrowUp":
      // Faire quelque chose pour la touche "up arrow" press??e.
      direction = -width
      break;
    case "ArrowLeft":
      // Faire quelque chose pour la touche "left arrow" press??e.
      direction = -1
      break;
    case "ArrowRight":
      // Faire quelque chose pour la touche "right arrow" press??e.
      direction = 1
      break;
    case "Enter":
      // Faire quelque chose pour les touches "enter" ou "return" press??es.
      break;
    case "Escape":
      // Faire quelque chose pour la touche "esc" press??e.
      break;
    default:
      return; // Quitter lorsque cela ne g??re pas l'??v??nement touche.
  }

  // Annuler l'action par d??faut pour ??viter qu'elle ne soit trait??e deux fois.
  event.preventDefault();
}, true);




// ------------------------ GENERATE FOOD ------------------------------
function generateFood() {
  do {
    foodIndex = Math.floor(Math.random() * squares.length)

  } while (squares[foodIndex].classList.contains('snake'));
  squares[foodIndex].classList.add('food')
}
