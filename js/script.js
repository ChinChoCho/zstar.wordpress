"use strict";

let menuIsActive = 0; // флаг активности главного меню
let topHeader = document.querySelector(".wrapper-inner-header__top");
let bottomHeader = document.querySelector(".wrapper-inner-header__bottom");
let topHeaderH = topHeader.getBoundingClientRect().height; // возвращает высоту элемента
let bottomHeaderH = bottomHeader.getBoundingClientRect().height; // -//-
let mainMenuBody = document.querySelector(".main-menu__body");

window.addEventListener("resize", function () {
    if (window.innerWidth < 768 && menuIsActive) {
        topHeaderH = topHeader.getBoundingClientRect().height;
        bottomHeaderH = bottomHeader.getBoundingClientRect().height;
        let currentTopHeaderH = topHeader.getBoundingClientRect().height - pageYOffset;
        if (currentTopHeaderH <= 0) {
            currentTopHeaderH = 0;
        }
        mainMenuBody.style.cssText =
            "height: calc(100vh - " +
            (bottomHeader.getBoundingClientRect().height + currentTopHeaderH) +
            "px); top: " +
            (bottomHeader.getBoundingClientRect().height + currentTopHeaderH) +
            "px;";
    }
    if (window.innerWidth >= 768 && menuIsActive) {
        let menuIcon = document.querySelector(".main-menu__icon");
        let body = document.querySelector(".body");
        mainMenuBody.classList.remove("_active");
        mainMenuBody.removeAttribute("style");
        menuIcon.classList.remove("_active");
        body.classList.remove("_active");
        menuIsActive = 0;
    }
});

function add_toggle_element(elementClass, elementsArray, toggleClass) {
    let element = document.querySelector("." + elementClass);
    element.addEventListener("click", function () {
        for (let i = 0; i < elementsArray.length; i++) {
            let element = document.querySelector("." + elementsArray[i]);
            element.classList.toggle(toggleClass); // для всех элементов elementsArray, при нажатии на кнопку elementClass, будет добавляться/убираться класс toggleClass
        }
        bottomHeaderH = bottomHeader.getBoundingClientRect().height;
        let currentTopHeaderH = topHeader.getBoundingClientRect().height - pageYOffset;
        if (currentTopHeaderH <= 0) {
            currentTopHeaderH = 0;
        }
        if (!menuIsActive) {
            //если меню не активно, то даем ему высоту и отступ, в зависимости от прокрутки страницы
            mainMenuBody.style.cssText =
                "height: calc(100vh - " +
                (bottomHeaderH + currentTopHeaderH) +
                "px); top: " +
                (bottomHeaderH + currentTopHeaderH) +
                "px;";
            //console.log("height: calc(100vh - (" + bottomHeaderH + "px + " + currentTopHeaderH + "px)); top: (" + bottomHeaderH + "px + (" + topHeader.getBoundingClientRect().height + "px - " + pageYOffset + "px));");
            menuIsActive = 1; // меню активно
        } else {
            // если меню активно, то убираем все приобретенные стили
            mainMenuBody.removeAttribute("style");
            menuIsActive = 0; // меню не активно
        }
    });
}

add_toggle_element("main-menu__icon", ["main-menu__icon", "main-menu__body", "body"], "_active");

// const myModal = new HystModal({
//     linkAttributeName: "data-hystmodal",
//     // настройки (не обязательно), см. API
// });
