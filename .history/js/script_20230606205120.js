const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");

const jump = () => {
  mario.style.animation = "jump 500ms ease-out";

  setTimeout(() => {
    mario.style.animation = "none";
  }, 500);
};

const checkCollision = () => {
  const pipeRect = pipe.getBoundingClientRect();
  const marioRect = mario.getBoundingClientRect();

  return (
    pipeRect.left < marioRect.right &&
    pipeRect.right > marioRect.left &&
    pipeRect.bottom > marioRect.top &&
    pipeRect.top < marioRect.bottom
  );
};

const gameLoop = setInterval(() => {
  if (checkCollision()) {
    clearInterval(gameLoop);
    pipe.style.animation = "none";
  }
}, 100);

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }
});
