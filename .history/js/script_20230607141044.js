const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");

let marioJumping = false;
let marioBottom = 0;
let pipeLeft = 100;
let gameOver = false;

const jump = () => {
  if (!marioJumping) {
    marioJumping = true;
    marioBottom += 180; // This should be adjusted based on the actual height of the Mario gif
    mario.style.bottom = `${marioBottom}px`;

    setTimeout(() => {
      marioJumping = false;
      marioBottom -= 180; // This should be adjusted based on the actual height of the Mario gif
      mario.style.bottom = `${marioBottom}px`;
    }, 500);
  }
};

const movePipe = () => {
  pipeLeft -= 2;
  if (pipeLeft < -10) {
    pipeLeft = 100;
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
      alert("Game Over!");
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
