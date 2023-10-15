"use strict";

/////////// THEMES toggle///////////////////////////////
const html = document.querySelector("html");

const themeToggler = document.querySelector(".themetoggle");

themeToggler.addEventListener("click", (e) => {
  e.preventDefault();
  if (localStorage.getItem("theme") === "dark") {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", "dark");
  }
  addDarkTheme();
});

const addDarkTheme = function () {
  if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
    document.querySelector(".themetoggle span").textContent = "wb_sunny";
  } else {
    html.classList.remove("dark");
    document.querySelector(".themetoggle span").textContent = "dark_mode";
  }
};
addDarkTheme();

////// GAME logic //////////////////
const body = document.querySelector("body");
const number = document.querySelector(".secret-number");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");

let randomNumber = Math.trunc(Math.random() * 5) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

checkBtn.addEventListener("click", function () {
  const input = +document.querySelector(".input").value;
  if (!input) {
    displayMessage("Invalid input!");
  } else if (input === randomNumber) {
    displayMessage("🥇 You win!");
    document.querySelector(".secret-number").textContent = randomNumber;
    number.style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
  }

  // when guess is wrong
  else if (input !== randomNumber) {
    if (score > 1) {
      displayMessage(input > randomNumber ? "Too high!" : "Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("💥 You lost :(");
      document.querySelector(".score").textContent = 0;
    }
  }
});

againBtn.addEventListener("click", function () {
  number.style.width = "20rem";
  displayMessage("Start guessing...");
  score = 20;
  randomNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector(".score").textContent = score;
  document.querySelector(".secret-number").textContent = "?";
  document.querySelector(".input").value = "";
});
