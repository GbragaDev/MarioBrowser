const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");

let marioJumping = false;
let marioBottom = 0;
let pipeLeft = 100;

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
  }

  pipe.style.left = `${pipeLeft}%`;
};

const checkCollision = () => {
  const pipeRect = pipe.getBoundingClientRect();
  const marioRect = mario.getBoundingClientRect();

  return (
    marioRect.bottom < pipeRect.bottom &&
    marioRect.right > pipeRect.left &&
    marioRect.left < pipeRect.right
  );
};

const gameLoop = () => {
  movePipe();

  if (checkCollision()) {
    clearInterval(gameLoop);
    alert("Game over!");
  } else {
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
