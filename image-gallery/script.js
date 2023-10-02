"use strict";

console.log(`Привет!`);

const accessKey = "l7EGpJ5GBstyjt1LhL6y90fLl37vTBUm8-itDtjrVe4";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gallery = document.querySelector(".gallery");
const clearBtn = document.querySelector(".btn_clear");

let keyword = "";
let page = 1;

document.addEventListener("load", loadRandom());

async function loadRandom(
  url = `https://api.unsplash.com/search/photos?per_page=18&page=${Math.round(
    Math.random() * 100
  )}&query=random&client_id=${accessKey}`
) {
  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  let images = "";
  results.map((img) => {
    images += `<img src=${img.urls.regular} class="image" alt="${img.alt_description}" draggable="false">`;
    gallery.style.display = "flex";
    gallery.innerHTML = images;
  });
}

async function searchImages() {
  let images = "";
  keyword = searchInput.value;
  let url = `https://api.unsplash.com/search/photos?per_page=18&page=${Math.round(
    Math.random() * 100
  )}&query=${keyword}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  results.map((img) => {
    images += `<img src=${img.urls.regular} class="image" alt="${img.alt_description}" draggable="false">`;
    gallery.style.display = "flex";
    gallery.innerHTML = images;
  });
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

clearBtn.addEventListener("click", () => (searchInput.value = ""));
