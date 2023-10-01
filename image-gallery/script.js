("use strict");

console.log(
  `Привет! Прости, не успела выполнить задание до дедлайна. Если есть возможность, вернись, пожалуйста, к проверке через пару дней. Думаю, до среды должна справиться. Спасибо!`
);

const accessKey = "l7EGpJ5GBstyjt1LhL6y90fLl37vTBUm8-itDtjrVe4";
const galleryEl = document.getElementById("gallery");

const loadImages = async (e) => {
  let images = "";
  await fetch(
    `https://api.unsplash.com/photos?per_page=12&page=${Math.round(
      Math.random() * 1000
    )}&client_id=${accessKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        data.forEach((img) => {
          images += `<img src=${img.urls.regular} class="image">`;
          galleryEl.style.display = "block";
          galleryEl.innerHTML = images;
        });
      }
    });
};
loadImages();
