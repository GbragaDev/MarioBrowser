const mario = document.querySelector(".mario");

const jump = (event) => {
  mario.classList.add("jump");

  setTimeout(funcao, 580);
};

document.addEventListener("keydown", jump);
