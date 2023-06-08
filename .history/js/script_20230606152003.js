const mario = document.querySelector(".mario");

const jump = () => {
  mario.classList.add("jump");
};

document.addEventListener("keydown", jump);

setTimeout((jump) => {
  mario.classList.remove("jump");
}, 580);
