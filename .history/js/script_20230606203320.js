const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");


const jumpDuration = 500;
let isJumping = false;


const jump = () => {
    if (!isJumping) {
        
        isJumping = true;
        mario.classList.add("jump");

    } 


/*css  const jump = () => {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};                         */`
    

    setTimeout(() => {
        mario.classList.remove("jump");
        isJumping = false;
    }, jumpDuration);
}
}
};


const checkCollision = () => {
const pipeRect = pipe.getBoundingClientRect();

};
}