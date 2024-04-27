document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(max-width: 1200px)").matches) {
      document.getElementById("warningBox").style.display = "block";
  } else {
      setTimeout(function () {
          document.querySelector(".preloader").classList.add("fade-out");
          document.getElementById("howToPlayBtn").style.display = "block";
      }, 1500);
      setTimeout(function () {
          document.querySelector(".preloader").style.display = "none";
      }, 1500);
  }
});

function closeWarning() {
  document.getElementById("warningBox").style.display = "none";
  setTimeout(function () {
      document.querySelector(".preloader").classList.add("fade-out");
      document.getElementById("howToPlayBtn").style.display = "block";
  }, 500);
  setTimeout(function () {
      document.querySelector(".preloader").style.display = "none";
  }, 1500);
}

let gameSeq = [];
let userSeq = [];
let btns = ["green", "red", "yellow", "blue"];
let started = false;
let level = 0;
let highestScore = localStorage.getItem("highestScore") || 0;

let h2 = document.querySelector("h2");
let highestScoreElement = document.getElementById("highest-score");

highestScoreElement.textContent = `Highest Score: ${highestScore}`;

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    let flashSound = document.getElementById("flashSound");
    flashSound.play();
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 500);
}
  
function userFlash(btn) {
    btn.classList.add("userflash");
    let flashSound = document.getElementById("flashSound");
    flashSound.play();
    setTimeout(function () {
      btn.classList.remove("userflash");
    }, 500);
}  

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randBtn);

  if (level > highestScore) {
    highestScore = level;
    highestScoreElement.textContent = `Highest Score: ${highestScore}`;
    localStorage.setItem("highestScore", highestScore); 
  }
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    let gameOverSound = document.getElementById("gameOverSound");
    gameOverSound.play();

    h2.innerHTML = `Game Over! <br> Your score: <b>${level}</b> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "black";
    }, 200);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function showInstructions() {
  document.getElementById("dialogBox").style.display = "block";
}

function closeInstructions() {
  document.getElementById("dialogBox").style.display = "none";
}
