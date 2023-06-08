const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");
const scoreElement = document.querySelector("#score");

let marioJumping = false;
let score = 0;
let gameRunning = true;
let pipePosition = 100; // Posição inicial do cano à direita

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

// Verificar colisão
function checkCollision() {
  const pipeRect = pipe.getBoundingClientRect();
  const marioRect = mario.getBoundingClientRect();

  return (
    pipeRect.left < marioRect.right &&
    pipeRect.right > marioRect.left &&
    pipeRect.top < marioRect.bottom &&
    pipeRect.bottom > marioRect.top
  );
}

// Atualizar posição do cano
function updatePipePosition() {
  pipePosition -= 2;

  if (pipePosition < -10) {
    pipePosition = 100;
    score += 100;
    scoreElement.innerText = `Score: ${score}`;
  }

  pipe.style.left = `${pipePosition}%`;
}

// Loop principal do jogo
function gameLoop() {
  if (gameRunning) {
    if (checkCollision()) {
      gameRunning = false;
      gameOver();
      return;
    }

    updatePipePosition();
    requestAnimationFrame(gameLoop);
  }
}

// Função de game over
function gameOver() {
  alert("Game over!");
  mario.src = "images/mario-gameover.png";
}

// Evento de pulo
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }
});

// Iniciar o loop do jogo
gameLoop();
