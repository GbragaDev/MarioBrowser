// Selecionar elementos
const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");
const scoreElement = document.querySelector("#score");

// Estado do jogo
let marioJumping = false;
let score = 0;
let gameRunning = true;

// Otimização: Observe a posição do cano usando GSAP
let pipePosition = { x: 0 };
gsap.to(pipePosition, {
  x: "-100%",
  duration: 2,
  repeat: -1,
  ease: "none",
  onUpdate: () => {
    pipe.style.left = pipePosition.x;
  },
  onRepeat: () => {
    score += 100;
    scoreElement.innerText = `Score: ${score}`;
  },
});

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
    if (gameOver || checkCollision()) {
      gameOver = true;
      alert("Game over!");
      mario.src = "images/mario-gameover.png"; // Troque para o caminho da sua imagem de game over
      return;
    }
  
    requestAnimationFrame(gameLoop);
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
