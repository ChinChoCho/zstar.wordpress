"use strict";

window.onscroll = function () {
    myFunction();
};

let navbar = document.querySelector(".wrapper-inner-header__bottom");
let sticky = navbar.offsetTop; // возвращает отступ сверху, относительно родительского элемента
let height = document.querySelector(".wrapper-inner-header__bottom")
    .clientHeight; // возвращает высоту элемента
let stickyPadding = document.querySelector(".sticky-padding"); // элемент, который будет отступом под фиксированным элементом

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        stickyPadding.style.height = height + "px";
    } else {
        navbar.classList.remove("sticky");
        stickyPadding.removeAttribute("style");
    }
}
