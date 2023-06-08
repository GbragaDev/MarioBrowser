const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");
const scoreElement = document.querySelector("#score");

let marioJumping = false;
let marioBottom = 0;
let pipeLeft = 100;
let gameOver = false;
let score = 0;

const jump = () => {
  if (!marioJumping) {
    marioJumping = true;
    marioBottom += 180;
    mario.style.bottom = `${marioBottom}px`;

    setTimeout(() => {
      marioJumping = false;
      marioBottom -= 180;
      mario.style.bottom = `${marioBottom}px`;
    }, 500);
  }
};

const movePipe = () => {
  pipeLeft -= 2;
  if (pipeLeft < -10) {
    pipeLeft = 100;
    score += 100;
    scoreElement.textContent = `Score: ${score}`;
  }

  pipe.style.left = `${pipeLeft}%`;
};

const checkCollision = () => {
  const pipeRect = pipe.getBoundingClientRect();
  const marioRect = mario.getBoundingClientRect();

  return (
    pipeRect.left < marioRect.right &&
    pipeRect.right > marioRect.left &&
    pipeRect.top < marioRect.bottom &&
    pipeRect.bottom > marioRect.top
  );
};

const gameLoop = () => {
  if (!gameOver) {
    movePipe();
    if (checkCollision()) {
      gameOver = true;

      mario.src = "images/game-over.png";
      alert("Game Over!");
      setTimeout(() => {
        alert("Game Over!");
      }, 100);
    }
    requestAnimationFrame(gameLoop);
  }
};

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }
});

gameLoop();
