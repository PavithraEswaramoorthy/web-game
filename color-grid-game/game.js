// Initialize variables
let playerColor = "blue"; // Player's chosen color
let playerScore = 0;
let timer = 60; // 60 seconds
let interval, colorChangeInterval;

// Select DOM elements
const grid = document.querySelector(".grid");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

// Create the 3x3 grid
function createGrid() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleCellClick(cell));
        grid.appendChild(cell);
    }
}

// Randomly assign colors to grid cells
function assignColors() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        const randomColor = Math.random() > 0.5 ? playerColor : getRandomColor();
        cell.style.backgroundColor = randomColor;
    });
}

// Get a random color that is not the player's color
function getRandomColor() {
    const colors = ["red", "green", "yellow", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Handle cell clicks
function handleCellClick(cell) {
    const color = cell.style.backgroundColor;

    if (color === playerColor) {
        playerScore++;
    } else {
        playerScore--;
    }

    updateScore();
}

// Update score on the UI
function updateScore() {
    scoreEl.textContent = `Score: ${playerScore}`;
}

// Start the timer
function startTimer() {
    interval = setInterval(() => {
        timer--;
        timerEl.textContent = `Time: ${timer}s`;

        if (timer === 0) {
            clearInterval(interval);
            clearInterval(colorChangeInterval);
            endGame();
        }
    }, 1000);
}

// End the game
function endGame() {
    alert(`Game Over! Your Score: ${playerScore}`);
    resetGame();
}

// Reset the game
function resetGame() {
    playerScore = 0;
    timer = 60;
    updateScore();
    timerEl.textContent = "Time: 60s";
    assignColors();
}

// Initialize the game
function startGame() {
    createGrid();
    assignColors();
    startTimer();
    startColorChange();
}

// Change colors every second
function startColorChange() {
    colorChangeInterval = setInterval(assignColors, 1000);
}

// Start the game when the page loads
startGame();
