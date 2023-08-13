console.log("Add responsive 768px\nAdd adaptive 1440-640px");
// Burger-menu
const navigation = document.querySelector(".navigation");
const burgerBtn = document.querySelector(".header__burger");
const body = document.body;
if (navigation && burgerBtn) burgerBtn.addEventListener("click", ()=>{
    navigation.classList.add("active");
    burgerBtn.classList.add("active");
    body.classList.add("lock");
});

//# sourceMappingURL=index.aa69868b.js.map
