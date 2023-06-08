const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");


const jumpDuration = 500;
let isJumping = false;


const jump = () => {
    if (isJumping) return;


/*css  const jump = () => {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};                         */`
    


const loop = setInterval(() => {
  const pipePosition = +window.getComputedStyle(pipe).left.replace("px", "");

  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition <= 80) {
    pipe.style.animation = none;
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = none;
    mario.style.bottom = `${marioPosition}px`;
  }
}, 10);

document.addEventListener("keydown", jump);
