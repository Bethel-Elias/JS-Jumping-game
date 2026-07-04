
// --------------------
// Elements
// --------------------

const character = document.getElementById("character");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
const startScreen = document.getElementById("startScreen");
const jumpSound = document.getElementById("jumpSound");
const gameOverSound = document.getElementById("gameOverSound");
const bgMusic = document.getElementById("bgMusic");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const playAgainBtn = document.getElementById("playAgainBtn");


// --------------------
// Game Variables
// --------------------

let jumpCount = 0;
const maxJumps = 2;
let gameOver = false;
let paused = false;
let gameStarted = false;
let score = 0;
let speed = 6;

character.style.bottom = "5px";

// --------------------
// High Score
// --------------------

let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = highScore;

// --------------------
// Start Game
// --------------------

function startGame() {

  gameStarted = true;
  startScreen.style.display = "none";
  bgMusic.play();
  animateCharacter();
  createObstacle();
}

// --------------------
// Character Animation
// --------------------

function animateCharacter() {

  let toggle = false;
  setInterval(() => {
    if (toggle) {
      character.style.backgroundImage = 'url("./images/run1.png")';
    } else {
      character.style.backgroundImage = 'url("./images/run2.png")';
    }
    toggle = !toggle;
  }, 200);
}

// --------------------
// Jump Function
// --------------------

function jump() {

  if (!gameStarted) return;
  if (gameOver) return;
  if (paused) return;

  // Double Jump Limit
  if (jumpCount >= maxJumps) return;
  jumpCount++;
  jumpSound.currentTime = 0;
  jumpSound.play();
  let position = parseInt(
    window.getComputedStyle(character).getPropertyValue("bottom")
  );
  let velocity = 18;
  let gravity = 1;
  const jumpInterval = setInterval(() => {
    position += velocity;
    velocity -= gravity;

    // Landing
    if (position <= 5) {
      position = 5;
      clearInterval(jumpInterval);
      jumpCount = 0;
    }
    character.style.bottom = position + "px";
  }, 20);
}

// --------------------
// Pause Function
// --------------------

function togglePause() {
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
}

// --------------------
// Restart Game
// --------------------

function restartGame() {
  location.reload();
}

// --------------------
// Create Obstacles
// --------------------

function createObstacle() {

  if (gameOver) return;
  const obstacle = createObstacleElement();
  game.appendChild(obstacle.element);
  moveObstacle(obstacle);
  spawnNextObstacle();
}

// --------------------
// Create Obstacle Element
// --------------------

function createObstacleElement() {

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  let obstacleData = {
    element: obstacle,
    left: 900,
    waveAngle: 0,
    waveSpeed: 0,
    waveHeight: 0,
    baseHeight: 0
  };

  const obstacleType = Math.random();

  // CACTUS
  if (obstacleType < 0.4) {
    setCactusObstacle(obstacle);
  }

  // ROCK
  else if (obstacleType < 0.8) {
    setRockObstacle(obstacle);
  }

  // BIRD
  else {
    setBirdObstacle(obstacleData);
  }
  obstacle.style.left = obstacleData.left + "px";
  return obstacleData;
}

// --------------------
// Cactus Obstacle
// --------------------

function setCactusObstacle(obstacle) {
  obstacle.style.backgroundImage = 'url("./images/cactus.png")';
  obstacle.style.height = "60px";
  obstacle.style.width = "40px";
  obstacle.style.bottom = "5px";
}

// --------------------
// Rock Obstacle
// --------------------

function setRockObstacle(obstacle) {

  obstacle.style.backgroundImage = 'url("./images/rock.png")';
  obstacle.style.height = "40px";
  obstacle.style.width = "40px";
  obstacle.style.bottom = "5px";
}

// --------------------
// Bird Obstacle
// --------------------

function setBirdObstacle(obstacleData) {

  const obstacle = obstacleData.element;
  obstacle.style.backgroundImage = 'url("./images/bird5.png")';
  obstacle.style.height = "40px";
  obstacle.style.width = "50px";
  obstacle.style.transform = "scaleX(-1)";
  obstacle.classList.add("flying");
  obstacleData.baseHeight = Math.random() * 80 + 80;
  obstacle.style.bottom = obstacleData.baseHeight + "px";
  obstacleData.waveSpeed = Math.random() * 0.15 + 0.05;
  obstacleData.waveHeight = Math.random() * 30 + 20;
}

// --------------------
// Move Obstacle
// --------------------

function moveObstacle(obstacleData) {

  const obstacle = obstacleData.element;
  const moveInterval = setInterval(() => {
    if (paused) return;
    if (gameOver) {
      clearInterval(moveInterval);
      return;
    }
    obstacleData.left -= speed;
    obstacle.style.left = obstacleData.left + "px";

    // Bird animation
    if (obstacle.classList.contains("flying")) {
      animateBird(obstacleData);
    }

    // Collision
    if (checkCollision(obstacleData)) {
      endGame();
    }

    // Remove obstacle
    if (obstacleData.left < -50) {
      removeObstacle(obstacleData, moveInterval);
    }
  }, 20);
}

// --------------------
// Animate Bird
// --------------------

function animateBird(obstacleData) {

  const obstacle = obstacleData.element;
  obstacleData.waveAngle += obstacleData.waveSpeed;
  let waveY =
    Math.sin(obstacleData.waveAngle) *
    obstacleData.waveHeight;
  obstacle.style.bottom =
    obstacleData.baseHeight + waveY + "px";
}

// --------------------
// Collision Detection
// --------------------

function checkCollision(obstacleData) {

  const obstacle = obstacleData.element;
  const characterBottom = parseInt(
    window.getComputedStyle(character).getPropertyValue("bottom")
  );
  const characterLeft = 95;
  const characterWidth = 35;
  const characterHeight = 45;
  const obstacleWidth = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("width")
  );
  const obstacleHeight = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("height")
  );
  const obstacleBottom = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("bottom")
  );
  const characterTop = characterBottom + characterHeight;
  const obstacleTop = obstacleBottom + obstacleHeight;
  const horizontalCollision =
    obstacleData.left < characterLeft + characterWidth &&
    obstacleData.left + obstacleWidth > characterLeft;
  const verticalCollision =
    characterBottom < obstacleTop &&
    characterTop > obstacleBottom;
  return horizontalCollision && verticalCollision;
}

// --------------------
// End Game
// --------------------

function endGame() {

  gameOver = true;
  bgMusic.pause();
  gameOverSound.play();
  finalScore.textContent = score;
  gameOverScreen.style.display = "flex";

  // Save High Score
  if (score > highScore) {
    localStorage.setItem("highScore", score);
    highScoreDisplay.textContent = score;
  }
}

// --------------------
// Remove Obstacle
// --------------------

function removeObstacle(obstacleData, interval) {

  clearInterval(interval);
  obstacleData.element.remove();
  score++;
  scoreDisplay.textContent = score;

  // Increase difficulty
  if (score % 5 === 0) {
    speed += 1;
  }
}

// --------------------
// Spawn Next Obstacle
// --------------------

function spawnNextObstacle() {

  const randomTime =
    Math.random() * 2000 + 1200;
  setTimeout(createObstacle, randomTime);
};

// --------------------
// Button Controls
// --------------------

startBtn.addEventListener("click", () => {
  if (!gameStarted) {
    startGame();
  }
});
pauseBtn.addEventListener("click", () => {
  if (!gameStarted || gameOver) return;
  togglePause();
});
restartBtn.addEventListener("click", () => {
  restartGame();
});
playAgainBtn.addEventListener("click", () => {
  restartGame();
});

// --------------------
// Keyboard Controls
// --------------------

document.addEventListener("keydown", (event) => {

  // ENTER = Start Game
  if (!gameStarted && event.code === "Enter") {
    startGame();
    return;
  }

  // Stop controls before game starts
  if (!gameStarted) return;

  // SPACE = Jump
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }

  // P = Pause
  if (event.key.toLowerCase() === "p") {
    if (!gameOver) {
      togglePause();
    }
  }

  // R = Restart
  if (event.key.toLowerCase() === "r") {
    restartGame();
  }
});