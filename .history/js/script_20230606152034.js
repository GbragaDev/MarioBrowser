const mario = document.querySelector(".mario");

document.addEventListener("keydown", jump);

const jump = () => {
  mario.classList.add("jump");
};
