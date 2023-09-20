"use strict";
console.log("");

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

  /////////////////////////////////////////////////////////////
  // PROFILE MODAL WINDOW UNAUTHORIZED
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

  // PROFILE MODAL WINDOW AUTHORIZED
  const profileMenuAuthorized = document.querySelector(
    ".profile__menu.authorized"
  );
  const profileIconAuthorized = document.querySelector(
    ".profile__icon.logged-in"
  );

  const toggleProfileMenuAuthorized = () => {
    profileIconAuthorized.addEventListener("click", () => {
      if (profileMenuAuthorized.classList.contains("hidden")) {
        profileMenuAuthorized.classList.remove("hidden");
      } else {
        !profileMenuAuthorized.classList.add("hidden");
      }
    });

    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".profile__icon") &&
        !e.target.closest(".profile__menu")
      ) {
        profileMenuAuthorized.classList.add("hidden");
      }
    });
  };
  toggleProfileMenuAuthorized();

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
    overlay.classList.remove("open");
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
  const registerSubmitBtn = document.querySelector("#register-submit");
  const loginSubmitBtn = document.querySelector("#login-submit");

  class NewUser {
    constructor(firstName, lastName, emailRegister, passwordRegister) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.emailRegister = emailRegister;
      this.passwordRegister = passwordRegister;
    }
  }
  let users = JSON.parse(localStorage.getItem("usersArray")) || [];

  const registerNewUser = (e) => {
    e.preventDefault();
    const registerForm = document.querySelector("#register-form");
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const emailRegister = document.querySelector("#email").value;
    const passwordRegister = document.querySelector("#register-password").value;

    users.push(
      new NewUser(firstName, lastName, emailRegister, passwordRegister)
    );
    localStorage.setItem("usersArray", JSON.stringify(users));
    localStorage.setItem("loginStatus", "false");
    modalLogin.classList.add("active");
    modalRegister.classList.remove("active");
    registerForm.reset();
  };

  registerSubmitBtn.addEventListener("click", registerNewUser);
  /////////////////////////////////
  // LOGIN;
  const logIn = (e) => {
    e.preventDefault();
    const loginForm = document.querySelector("#login-form");
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());
    const emailLogin = data["email-login"].trim().toLowerCase();
    const passwordLogin = data["login-password"];

    let users = JSON.parse(localStorage.getItem("usersArray")) || [];

    let currentUser = users.filter(
      (user) => user.emailRegister == emailLogin
    )[0];

    if (currentUser) {
      if (passwordLogin == currentUser.passwordRegister) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("loginStatus", "true");
        loginForm.reset();
        loggedInState();
      } else {
        alert("Wrong password");
      }
    } else {
      alert("User not found");
    }
  };
  loginSubmitBtn.addEventListener("click", logIn);
  ///////////////////////////////////////////////////////////////

  const loggedInState = (e) => {
    const profileIconText = document.querySelector(".profile__icon_text");

    profileIcon.classList.add("hidden");
    profileIconAuthorized.classList.remove("hidden");
    modalLogin.classList.remove("active");
    overlay.classList.remove("active");

    profileIconText.innerText = `${
      JSON.parse(localStorage.getItem("currentUser")).firstName[0]
    }${
      JSON.parse(localStorage.getItem("currentUser")).lastName[0]
    }`.toUpperCase();

    profileIconAuthorized.style.cursor = "pointer";
    profileIconAuthorized.addEventListener("click", () => {
      profileMenuAuthorized.classList.add("active");
    });

    document
      .querySelector(".form__sign-btn.register-link")
      .classList.add("hidden");

    document
      .querySelector(".form__sign-btn.login-link")
      .classList.add("hidden");

    document
      .querySelector(".form__sign-btn.my-profile-link")
      .classList.remove("hidden");
  };

  ////////////////////////////////////////////////////////////////////////////
  // MY PROFILE MODAL
  const myProfileBtn = document.querySelectorAll(".my-profile-link");
  const modalProfile = document.querySelector(".modal__profile");

  myProfileBtn.forEach((link) => {
    link.addEventListener("click", () => {
      modalProfile.classList.add("active");
      overlay.classList.add("open");
    });
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".my-profile-link") &&
        !e.target.closest(".modal__profile")
      ) {
        modalProfile.classList.remove("active");
        overlay.classList.remove("open");
      }
    });
  });

  // LOGOUT
  const logOutBtn = document.querySelector(".logout-link");
  const loggedOutState = () => {
    logOutBtn.addEventListener("click", () => {
      localStorage.setItem("loginStatus", false);

      profileIcon.classList.remove("hidden");
      profileIconAuthorized.classList.add("hidden");

      document
        .querySelector(".form__sign-btn.register-link")
        .classList.remove("hidden");
      document
        .querySelector(".form__sign-btn.login-link")
        .classList.remove("hidden");
      document
        .querySelector(".form__sign-btn.my-profile-link")
        .classList.add("hidden");
    });
  };
  loggedOutState();

  // Logged state after refresh
  const checkState = () => {
    if (JSON.parse(localStorage.getItem("loginStatus", "true"))) {
      loggedInState();
    } else {
      loggedOutState();
    }
  };
  checkState();

  // VALIDATE REGISTER
  // VALIDATE LOGIN
});
