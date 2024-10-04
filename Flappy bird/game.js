const gameArea = document.getElementById('gameArea');
const bird = document.getElementById('bird');
const scoreDisplay = document.getElementById('score');

let birdY = 300; // Starting position
let gravity = 0.3;
let velocity = 0;
let pipes = [];
let score = 0;
let gameInterval;
let pipeInterval;

// Control bird with space key
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        velocity = -7; // Bird jumps upwards when space is pressed
    }
});

// Create pipes
function createPipe() {
    const pipeGap = 150;
    const pipeHeight = Math.floor(Math.random() * 200) + 100;

    // Top pipe
    const pipeTop = document.createElement('div');
    pipeTop.classList.add('pipe', 'pipe-top');
    pipeTop.style.height = pipeHeight + 'px';
    pipeTop.style.left = '400px';
    gameArea.appendChild(pipeTop);

    // Bottom pipe
    const pipeBottom = document.createElement('div');
    pipeBottom.classList.add('pipe', 'pipe-bottom');
    pipeBottom.style.height = (600 - pipeHeight - pipeGap) + 'px';
    pipeBottom.style.left = '400px';
    gameArea.appendChild(pipeBottom);

    pipes.push({ top: pipeTop, bottom: pipeBottom });
}

// Move pipes and check for collisions
function movePipes() {
    pipes.forEach((pipe, index) => {
        const pipeLeft = parseInt(pipe.top.style.left);

        if (pipeLeft <= -60) {
            // Remove pipes that go off-screen
            pipe.top.remove();
            pipe.bottom.remove();
            pipes.splice(index, 1);
            score++; // Increase score when pipe passes
            scoreDisplay.textContent = score;
        } else {
            // Move pipes to the left
            pipe.top.style.left = pipeLeft - 3 + 'px';
            pipe.bottom.style.left = pipeLeft - 3 + 'px';

            // Check for collisions
            if (
                (pipeLeft < 90 && pipeLeft > 50) &&
                (birdY < parseInt(pipe.top.style.height) || birdY + 30 > 600 - parseInt(pipe.bottom.style.height))
            ) {
                gameOver();
            }
        }
    });
}

// Game over function
function gameOver() {
    clearInterval(gameInterval);
    clearInterval(pipeInterval);
    alert('Game Over! Score: ' + score);
    location.reload();
}

// Update bird position and apply gravity
function updateBird() {
    velocity += gravity;
    birdY += velocity;

    if (birdY < 0) {
        birdY = 0;
    }

    if (birdY > 570) {
        gameOver();
    }

    bird.style.top = birdY + 'px';
}

// Start game loop
function startGame() {
    gameInterval = setInterval(() => {
        updateBird();
        movePipes();
    }, 20);

    pipeInterval = setInterval(createPipe, 2000);
}

// Start the game
startGame();
