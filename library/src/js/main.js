console.log(
  "Привет!\n1. Вёрстка соответствует макету. Ширина экрана 768px +26 \n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n3. На ширине экрана 768рх реализовано адаптивное меню (с недочётами) +10\nИтого: 48\nЕсли есть возможность, пожалуйста, вернись к проверке позже, попробую доработать адаптивное меню. \nМой дискорд: Liudmila#7427.\nСпасибо! :)"
);

// Burger-menu
const navigation = document.querySelector(".navigation");
const burgerBtn = document.querySelector(".header__burger");
const body = document.body;

if (navigation && burgerBtn) {
  burgerBtn.addEventListener("click", () => {
    navigation.classList.toggle("active");
    burgerBtn.classList.toggle("active");
    // body.classList.toggle("lock");
  });
}
