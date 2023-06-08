const mario = document.querySelector(".mario");

const jump = (event) => {
  mario.classList.add("jump");
};

document.addEventListener("keydown", jump);
