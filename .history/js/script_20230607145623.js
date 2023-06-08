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
// Loop principal do jogo
function gameLoop() {
  if (checkCollision()) {
    gameOver();
    return;
  }

  // Se não houve colisão, conceda pontos e continue o jogo
  if (pipe.getBoundingClientRect().right < 0) {
    score += 100;
    console.log(`Score: ${score}`);
  }

  requestAnimationFrame(gameLoop);
}

function gameOver() {
  alert("Game over!");
  mario.src = "images/mario-gameover.png"; // Troque para o caminho da sua imagem de game over
}

// Evento de pulo
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }
});

// Inicie o loop do jogo
gameLoop();
