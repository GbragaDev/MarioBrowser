const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");

let marioJumping = false;
let marioBottom = 0;
let pipeLeft = 100;

const jump = () => {
  if (!marioJumping) {
    marioJumping = true;
    marioBottom += 180;

    setTimeout(() => {
      marioJumping = false;
      marioBottom -= 180;
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

const updatePositions = () => {
  mario.style.bottom = `${marioBottom}px`;
  pipe.style.left = `${pipeLeft}%`;
};

const checkCollision = () => {
  const pipeRect = pipe.getBoundingClientRect();
  const marioRect = mario.getBoundingClientRect();

  return (
    marioRect.bottom > pipeRect.top &&
    marioRect.top < pipeRect.bottom &&
    marioRect.right > pipeRect.left &&
    marioRect.left < pipeRect.right
  );
};

const gameLoop = setInterval(() => {
  movePipe();
  updatePositions();

  if (checkCollision()) {
    alert("Game over!");
  }
}, 100);

//
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }
});
