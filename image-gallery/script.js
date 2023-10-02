"use strict";

console.log(`Привет! Минимальные требования выполнены.

Вёрстка +10
- на странице есть несколько фото и строка поиска +5
- в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5

При загрузке приложения на странице отображаются полученные от API изображения +10

Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10

Поиск +30
- при открытии приложения курсор находится в поле ввода +5
- есть placeholder +5
- автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
- поисковый запрос можно отправить нажатием клавиши Enter +5
- после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
- в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5

Итого: 60/60
`);

const accessKey = "l7EGpJ5GBstyjt1LhL6y90fLl37vTBUm8-itDtjrVe4";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gallery = document.querySelector(".gallery");
const clearBtn = document.querySelector(".btn_clear");

let keyword = "";
let page = 1;

document.addEventListener("DOMContentLoaded", loadRandom());

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
    images += `<img src=${img.urls.small} class="image" alt="${img.alt_description}" draggable="false">`;
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
    images += `<img src=${img.urls.small} class="image" alt="${img.alt_description}" draggable="false">`;
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
