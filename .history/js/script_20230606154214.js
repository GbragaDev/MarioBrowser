const mario = document.querySelector(".mario");

const jump = () => {
  mario.classList.add("jump");
  setTimeout((jump) => {
    mario.classList.remove("jump");
  }, 500);
};

document.addEventListener("keydown", jump);
