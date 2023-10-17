const html = document.querySelector("html");
const themeToggler = document.querySelector(".theme");

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

const toggleThemes = (e) => {
  e.preventDefault();
  if (localStorage.getItem("theme") === "dark") {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", "dark");
  }
  addDarkTheme();
};

themeToggler.addEventListener("click", toggleThemes);
