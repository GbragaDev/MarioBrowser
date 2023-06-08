const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");

const jumpDuration = 500;
let isJumping = false;

const jump = () => {
  if (!isJumping) {
    isJumping = true;
    mario.classList.add("jump");
  }

  setTimeout(() => {
    mario.classList.remove("jump");
    isJumping = false;
  }, jumpDuration);
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

const gameLoop = setInterval(() => {
  if (checkCollision() && !isJumping) {
    clearInterval(gameLoop);
    pipe.style.animation = "none";
    mario.style.animation = "none";
  }
}, 100);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }
});
