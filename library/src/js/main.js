console.log(
  "Привет!\n1. Вёрстка соответствует макету. Ширина экрана 768px +26 \n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n3. На ширине экрана 768рх реализовано адаптивное меню +12\nИтого: 50\nСпасибо! :)"
);

// BURGER_MENU
document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector(".navigation");
  const burgerBtn = document.querySelector(".header__burger");
  const navLinks = document.querySelectorAll(".navigation__link");

  burgerBtn.addEventListener("click", () => {
    navigation.classList.toggle("active");
    burgerBtn.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("active");
      burgerBtn.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".header__burger") &&
      !e.target.closest(".navigation")
    ) {
      navigation.classList.remove("active");
      burgerBtn.classList.remove("active");
    }
  });
});
