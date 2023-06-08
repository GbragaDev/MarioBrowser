const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");
const scoreElement = document.querySelector("#score");

let marioJumping = false;
let marioBottom = 0;
let pipeLeft = 100;
let gameOver = false;
let score = 0;

gsap.to("#pipe", {
  x: -window.innerWidth,
  duration: 2, // This will determine the speed of the pipe. Adjust as needed.
  repeat: -1, // This will make the animation loop indefinitely.
  ease: "none", // This will make the pipe move at a constant speed.
  onRepeat: resetPipePosition, // Reset the pipe position at the end of each loop
});

function resetPipePosition() {
  gsap.set("#pipe", { x: 0 });
}

// Função de pulo
function jump() {
  if (!marioJumping) {
    marioJumping = true;
    gsap.to(mario, {
      y: -180,
      duration: 0.5,
      onComplete: () => {
        marioJumping = false;
      },
    });
  }
}

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

function gameLoop() {
  if (!gameOver) {
    if (checkCollision()) {
      gameOver = true;

      mario.src = "images/game-over.png";
      setTimeout(() => {
        alert("Game Over!");
      }, 100);
    }
    requestAnimationFrame(gameLoop);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }
});

gameLoop();
