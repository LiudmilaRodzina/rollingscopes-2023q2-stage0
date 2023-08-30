"use strict";
console.log("Выполнено: Ограниченная карусель в блоке About + 25 баллов");

document.addEventListener("DOMContentLoaded", () => {
  // BURGER_MENU
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
  ////////////////////////////////////////////////////////////////////////////
  // SLIDER ABOUT
  const sliderLine = document.querySelector(".slider__items");
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");
  const dots = document.querySelectorAll(".pagination-dot");

  let position = 0;
  let dotIndex = 0;

  const disableArrowRight = () => {
    if (dotIndex === dots.length - 1) {
      arrowRight.disabled = true;
      arrowRight.classList.add("disabled");
    } else {
      arrowRight.disabled = false;
      arrowRight.classList.remove("disabled");
    }
  };
  const disableArrowLeft = () => {
    if (dotIndex === 0) {
      arrowLeft.disabled = true;
      arrowLeft.classList.add("disabled");
    } else {
      arrowLeft.disabled = false;
      arrowLeft.classList.remove("disabled");
    }
  };

  const nextSlide = () => {
    if (position < (dots.length - 1) * 47.5) {
      position += 47.5;
      dotIndex++;
      disableArrowRight();
      disableArrowLeft();
    } else {
      position = 0;
      dotIndex = 0;
    }
    sliderLine.style.left = -position + "rem";
    thisSlide(dotIndex);
  };

  const prevSlide = () => {
    if (position > 0) {
      position -= 47.5;
      dotIndex--;
      disableArrowRight();
      disableArrowLeft();
    } else {
      position = (dots.length - 1) * 47.5;
      dotIndex = dots.length - 1;
    }
    sliderLine.style.left = -position + "rem";
    thisSlide(dotIndex);
  };

  const thisSlide = (index) => {
    for (let dot of dots) {
      dot.classList.remove("dot-active");
    }
    dots[index].classList.add("dot-active");
    disableArrowRight();
    disableArrowLeft();
  };

  arrowRight.addEventListener("click", nextSlide);
  arrowLeft.addEventListener("click", prevSlide);

  arrowLeft.addEventListener("mouseover", () => {
    if (dotIndex === 0) {
      arrowLeft.disabled = true;
      arrowLeft.classList.add("disabled");
    }
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      position = 47.5 * index;
      sliderLine.style.left = -position + "rem";
      dotIndex = index;
      thisSlide(dotIndex);
    });
  });
});
