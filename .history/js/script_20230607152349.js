const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");
const scoreElement = document.querySelector("#score"); // Novo: Seleciona o elemento de pontuação

let marioJumping = false;
let marioBottom = 0;
let pipeLeft = 100;
let gameOver = false;
let score = 0;
let pipeSpeed = 2; // Novo: Velocidade do cano

const jump = () => {
  if (!marioJumping) {
    marioJumping = true;
    marioBottom += 100;
    mario.style.bottom = `${marioBottom}px`;

    setTimeout(() => {
      marioJumping = false;
      marioBottom -= 100;
      mario.style.bottom = `${marioBottom}px`;
    }, 500);
  }
};

const movePipe = () => {
  pipeLeft -= 2;
  if (pipeLeft < -10) {
    pipeLeft = 100;
    score += 100; // Novo: Aumenta a pontuação quando o cano é reiniciado
    scoreElement.textContent = `Score: ${score}`; // Novo: Atualiza o elemento de pontuação
    if (score % 1000 === 0) { // Verifica se a pontuação é um múltiplo de 1000
        pipeSpeed += 1; // Aumenta a velocidade do cano em 1
  
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
