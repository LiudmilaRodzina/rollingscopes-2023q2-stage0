"use strict";
console.log(
  `Привет! Вроде бы минимальные требования задания выполнены. Спасибо за ожидание!`
);

// Game Logic //
const body = document.querySelector("body");
const number = document.querySelector(".secret-number");
const checkBtn = document.querySelector(".check");
const againBtn = document.querySelector(".again");

let randomNumber = Math.trunc(Math.random() * 20) + 1;
let numberOfGuesses = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};
checkBtn.addEventListener("click", function () {
  const input = +document.querySelector(".input").value;
  if (!input) {
    displayMessage("🤷‍♀️ Invalid input!");
  } else if (input !== randomNumber) {
    displayMessage(input > randomNumber ? "📈 Too high!" : "📉 Too low!");
    numberOfGuesses++;
    document.querySelector(".number-of-guesses").textContent = numberOfGuesses;
    if (numberOfGuesses > 20 - 1) {
      displayMessage("💥 You lost!");
      document.querySelector(".secret-number").textContent = randomNumber;

      document.querySelector(".number-of-guesses").textContent =
        numberOfGuesses;

      checkBtn.disabled = true;
      checkBtn.classList.add("disable");
    }
    //// when  guess is correct
  } else if (input === randomNumber) {
    displayMessage("🥇 You win!");
    numberOfGuesses++;
    document.querySelector(".secret-number").style.backgroundColor = "#a4d8aa";
    if (numberOfGuesses > 0) {
      saveScore();
      location.reload();
    }
    document.querySelector(".secret-number").textContent = randomNumber;
    document.querySelector(".number-of-guesses").textContent = numberOfGuesses;
    number.style.width = "30rem";
  }
});
againBtn.addEventListener("click", function () {
  number.style.width = "20rem";
  displayMessage("Start guessing...");
  numberOfGuesses = 0;
  randomNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector(".number-of-guesses").textContent = numberOfGuesses;
  document.querySelector(".secret-number").textContent = "?";
  document.querySelector(".input").value = "";
  checkBtn.disabled = false;
  checkBtn.classList.remove("disable");
  saveScore();
  location.reload();
});

// Local Storage //
let results = JSON.parse(localStorage.getItem("results")) || [];

const saveScore = (e) => {
  const score = {
    name: "Result",
    score: numberOfGuesses,
  };
  if (score.score > 0) {
    results.unshift(score);
    results.splice(10);
  }
  localStorage.setItem("results", JSON.stringify(results));
};
saveScore();

// Render Results List //
const resultsList = document.getElementById("results_list");
resultsList.innerHTML = results
  .map((score) => {
    return `<li class='high-score'>${score.name}: <span class='num'>${score.score}</span></li>`;
  })
  .join("");

// Restart //
const clearBtn = document.querySelector(".restart");
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
