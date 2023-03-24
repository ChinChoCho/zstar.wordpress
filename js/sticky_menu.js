"use strict";

let headerTop = document.querySelector(".wrapper-inner-header__top");
let menuOffset = headerTop.clientHeight;
let headerBottom = document.querySelector(".wrapper-inner-header__bottom");
let menuHeight = headerBottom.clientHeight; // возвращает высоту элемента
let stickyPadding = document.querySelector(".sticky-padding"); // элемент, который будет отступом под фиксированным элементом

window.addEventListener("scroll", myFunction);
window.addEventListener("resize", myFunction);

function myFunction() {
  menuOffset = headerTop.clientHeight;
  menuHeight = headerBottom.clientHeight;
  if (window.pageYOffset >= menuOffset) {
    headerBottom.classList.add("sticky");
    stickyPadding.style.height = menuHeight + "px";
  }
  if (window.pageYOffset < menuOffset) {
    headerBottom.classList.remove("sticky");
    stickyPadding.removeAttribute("style");
  }
}

myFunction();
