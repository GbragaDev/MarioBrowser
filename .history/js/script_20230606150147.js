const mario = document.querySelector(".mario");

const jump = (event) => {
  mario.classList.add(".jump");

  setTimeout(() => {
    mario.classList.remove(".jump"); //
  }, 500);
};

document.addEventListener("keyup", jump);
