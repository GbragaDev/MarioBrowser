// Selecionar elementos
const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");
const scoreElement = document.querySelector("#score");

let marioJumping = false;
let marioBottom = 0;
let pipeLeft = 100;
let gameOver = false;
let score = 0;

// Animação do Pipe usando GSAP
gsap.to(pipe, {
  x: "-100%", // Ajustar para mover o cano para a esquerda
  duration: 2,
  repeat: -1,
  ease: "none",
  onRepeat: resetPipePosition,
});

function resetPipePosition() {
  gsap.set(pipe, { x: 0 }); // Reposicionar o cano à direita quando a animação reiniciar
}

// Função de pulo
function jump() {
  if (!marioJumping) {
    marioJumping = true;
    gsap.to(mario, {
      y: -180, // Ajustar para fazer o Mario pular para cima
      duration: 0.5,
      onComplete: () => {
        marioJumping = false;
        gsap.to(mario, { y: 0, duration: 0.5 }); // Ajustar para fazer o Mario voltar para baixo
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
