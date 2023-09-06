"use strict";
console.log("Выполнено: Ограниченная карусель в блоке About + 25 баллов");

document.addEventListener("DOMContentLoaded", () => {
  // BURGER MENU
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

/////////////////////////////////////////////////////////////
// PROFILE MODAL WINDOW
const profileIcon = document.querySelector(".profile__icon");
const profileMenu = document.querySelector(".profile__menu");

const toggleProfileMenu = () => {
  profileIcon.addEventListener("click", () => {
    profileMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".profile__icon") &&
      !e.target.closest(".profile__menu")
    ) {
      profileMenu.classList.remove("active");
    }
  });
};
toggleProfileMenu();

// CLOSE MODAL
const closeModal = document.querySelectorAll(".modal__close");
const overlay = document.querySelector(".overlay");

closeModal.forEach((el) => {
  el.addEventListener("click", () => {
    modalRegister.classList.remove("active");
    modalLogin.classList.remove("active");
    modalProfile.classList.remove("active");
    overlay.classList.remove("active");
    overlay.classList.remove("open");
  });
});

overlay.addEventListener("click", () => {
  modalRegister.classList.remove("active");
  modalLogin.classList.remove("active");
  overlay.classList.remove("active");
});

// REGISTER MODAL
const modalRegister = document.querySelector(".modal__register");
const registerLinks = document.querySelectorAll(".register-link");

registerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    modalRegister.classList.add("active");
    modalLogin.classList.remove("active");

    if (!overlay.classList.contains("active")) {
      overlay.classList.add("active");
    }
  });
});

// LOGIN MODAL
const modalLogin = document.querySelector(".modal__login");
const loginLinks = document.querySelectorAll(".login-link");

loginLinks.forEach((link) => {
  link.addEventListener("click", () => {
    modalLogin.classList.add("active");
    modalRegister.classList.remove("active");

    if (!overlay.classList.contains("active")) {
      overlay.classList.add("active");
    }
  });
});

///////////////////////////////////////////////////////////////////
// LOCALSTORAGE
// localStorage.clear();
const registerSubmitBtn = document.querySelector("#register-submit");
const loginSubmitBtn = document.querySelector("#login-submit");

const firstName = document.querySelector("#first-name").value;
const lastName = document.querySelector("#last-name").value;

const register = (e) => {
  e.preventDefault();
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;
  const email = document.querySelector("#email").value;
  const passwordRegister = document.querySelector("#register-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let exist =
    users.length &&
    JSON.parse(localStorage.getItem("users")).some(
      (data) =>
        data.firstName.toLowerCase() == firstName.toLowerCase() &&
        data.lastName.toLowerCase() == lastName.toLowerCase()
    );

  if (!exist) {
    users.push({ firstName, lastName, email, passwordRegister });
    localStorage.setItem("users", JSON.stringify(users));
    modalLogin.classList.add("active");
    modalRegister.classList.remove("active");
  } else {
    alert("Duplicate account!");
  }
};
registerSubmitBtn.addEventListener("click", register);

const logIn = (e) => {
  e.preventDefault();
  const loginForm = document.querySelector("#login-form");
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());
  const emailLogin = data["email-login"].trim().toLowerCase();
  const password = data["password"];

  let users = localStorage.getItem("users") || [];
  users = JSON.parse(users);

  let currentUser = users.filter((user) => user.email == emailLogin)[0];

  if (currentUser) {
    if (password == currentUser.passwordRegister) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      loginForm.reset();
      loggedInState();
      profileIcon.innerHTML =
        `${currentUser.firstName[0]}${currentUser.lastName[0]}`.toUpperCase();
    } else {
      alert("Wrong password");
    }
  } else {
    alert("User not found");
  }
};
loginSubmitBtn.addEventListener("click", logIn);
///////////////////////////////////////////////////////////////
const loggedInState = () => {
  profileIcon.classList.add("logged");
  modalLogin.classList.remove("active");
  overlay.classList.remove("active");
};

// MY PROFILE MODAL activate on LOGO (TODO: later on My profile buttons)
const myProfileBtn = document.querySelector(".logo");
const modalProfile = document.querySelector(".modal__profile");

const openMyProfile = () => {
  myProfileBtn.addEventListener("click", () => {
    modalProfile.classList.add("active");
    overlay.classList.add("open");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".logo") && !e.target.closest(".modal__profile")) {
      modalProfile.classList.remove("active");
      overlay.classList.remove("open");
    }
  });
};
openMyProfile();
