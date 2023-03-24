"use strict";

let elements = document.querySelectorAll(".slider__item");
let slider = document.getElementById("slider");
let slideTitle = document.querySelectorAll(".slider__item-title");
let sliderButton = document.querySelectorAll(".slider__item-button");
let hiddenButton = document.querySelectorAll(".slider__item-button.hidden");
let leftArrow = document.querySelector(".slider__arrow-left");
let rightArrow = document.querySelector(".slider__arrow-right");
let navigation = document.querySelector(".slider__nav");

let navElements = [];
let transitionTime = 400;
let windowWidthTrigger = 768;

window.addEventListener("resize", function () {
    if (window.innerWidth < windowWidthTrigger) {
        let notActiveSlidesCounter = 0;
        for (let i = 0; i < elements.length; i++) {
            elements[i].removeEventListener("click", slide_open);
            elements[i].removeEventListener("click", slide_close);
            elements[i].removeEventListener("mouseenter", slide_enter);
            elements[i].removeEventListener("mouseleave", slide_leave);
            elements[i].removeEventListener("touchstart", slide_open_on_touchscreen);
            elements[i].addEventListener("click", prevent_default);
            slideTitle[i].removeAttribute("style");
            if (elements[i].classList[1] === "_active") {
                for (let j = 0; j < elements.length; j++) {
                    elements[j].removeAttribute("style");
                    elements[j].style.transform = "";
                    elements[j].style.left = (j - i) * 100 + "%";
                    navElements[j].classList.remove("_active");
                }
                navElements[i].classList.add("_active");
                if (i === 0) {
                    leftArrow.classList.remove("_active");
                    leftArrow.removeEventListener("click", onLeftArrowClick);
                    rightArrow.classList.add("_active");
                    rightArrow.addEventListener("click", onRightArrowClick);
                    if (i === elements.length - 1) {
                        rightArrow.classList.remove("_active");
                        rightArrow.removeEventListener("click", onRightArrowClick);
                    }
                } else if (i === elements.length - 1) {
                    leftArrow.classList.add("_active");
                    leftArrow.addEventListener("click", onLeftArrowClick);
                    rightArrow.classList.remove("_active");
                    rightArrow.removeEventListener("click", onRightArrowClick);
                } else {
                    leftArrow.classList.add("_active");
                    leftArrow.addEventListener("click", onLeftArrowClick);
                    rightArrow.classList.add("_active");
                    rightArrow.addEventListener("click", onRightArrowClick);
                }
            } else {
                notActiveSlidesCounter++;
                if (notActiveSlidesCounter === elements.length) {
                    for (let j = 0; j < navElements.length; j++) {
                        elements[j].removeAttribute("style");
                        navElements[j].classList.remove("_active");
                        elements[j].style.left = j * 100 + "%";
                    }
                    navElements[0].classList.add("_active");
                    elements[0].classList.add("_active");
                    rightArrow.addEventListener("click", onRightArrowClick);
                    rightArrow.classList.add("_active");
                    leftArrow.classList.remove("_active");
                    leftArrow.removeEventListener("click", onLeftArrowClick);
                    if (i === elements.length - 1 && i === 0) {
                        rightArrow.classList.remove("_active");
                        rightArrow.removeEventListener("click", onRightArrowClick);
                    }
                }
            }
        }
        for (let i = 0; i < hiddenButton.length; i++) {
            hiddenButton[i].classList.remove("hidden");
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", slide_open);
            elements[i].addEventListener("mouseenter", slide_enter);
            elements[i].addEventListener("mouseleave", slide_leave);
            elements[i].addEventListener("touchstart", slide_open_on_touchscreen, { once: true });
            elements[i].style.left =
                (((slider.clientWidth / elements.length) * i) / slider.clientWidth) * 100 + "%";
            if (!(elements[i].classList[1] === "_active")) {
                elements[i].addEventListener("click", slide_open);
                set_default_title_width(i);
            } else {
                set_full_slide(elements[i]);
            }
        }
        for (let i = 0; i < hiddenButton.length; i++) {
            hiddenButton[i].classList.add("hidden");
        }
    }
});

function float_slide() {
    //Добавляем каждому слайду события
    if (!slider) return;
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("data-id", i); // Добавляем атрибуты всем слайдам, чтобы определять выбранный слайд в будущем
        sliderButton[i].addEventListener("click", open_link);
        let navElement = document.createElement("div");
        navElement.setAttribute("data-id", i);
        navigation.append(navElement);
        navElements[i] = navElement;
        navElements[i].addEventListener("click", change_active_slide);
    }
    if (window.innerWidth < windowWidthTrigger) {
        for (let i = 0; i < elements.length; i++) {
            sliderButton[i].classList.remove("hidden");
            elements[i].style.left = i * 100 + "%";
            elements[i].addEventListener("click", prevent_default);
        }
        elements[0].classList.add("_active");
        navElements[0].classList.add("_active");
        if (elements.length > 1) {
            rightArrow.addEventListener("click", onRightArrowClick);
            rightArrow.classList.add("_active");
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            sliderButton[i].addEventListener("click", open_link);
            elements[i].addEventListener("click", slide_open);
            elements[i].addEventListener("mouseenter", slide_enter);
            elements[i].addEventListener("touchstart", slide_open_on_touchscreen, { once: true });
            elements[i].addEventListener("mouseleave", slide_leave);
            elements[i].style.left =
                (((slider.clientWidth / elements.length) * i) / slider.clientWidth) * 100 + "%";
            set_default_title_width(i);
        }
    }
}
function onLeftArrowClick() {
    let activeSlideNumber;
    rightArrow.classList.add("_active");
    rightArrow.addEventListener("click", onRightArrowClick);
    leftArrow.classList.add("animation");
    setTimeout(() => leftArrow.classList.remove("animation"), transitionTime);
    for (let i = 1; i < elements.length; i++) {
        if (elements[i].classList[1] === "_active") {
            elements[i].classList.remove("_active");
            navElements[i].classList.remove("_active");
            activeSlideNumber = i - 1;
            if (+elements[i - 1].getAttribute("data-id") === 0) {
                leftArrow.classList.remove("_active");
                leftArrow.removeEventListener("click", onLeftArrowClick);
            }
        }
    }
    elements[activeSlideNumber].classList.add("_active");
    navElements[activeSlideNumber].classList.add("_active");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.left = (i - activeSlideNumber) * 100 + "%";
    }
}

function onRightArrowClick() {
    let activeSlideNumber;
    leftArrow.classList.add("_active");
    leftArrow.addEventListener("click", onLeftArrowClick);
    rightArrow.classList.add("animation");
    setTimeout(() => rightArrow.classList.remove("animation"), transitionTime);
    for (let i = 0; i < elements.length - 1; i++) {
        if (elements[i].classList[1] === "_active") {
            elements[i].classList.remove("_active");
            navElements[i].classList.remove("_active");
            activeSlideNumber = i + 1;
            if (+elements[i + 1].getAttribute("data-id") === elements.length - 1) {
                rightArrow.classList.remove("_active");
                rightArrow.removeEventListener("click", onRightArrowClick);
            }
        }
    }
    elements[activeSlideNumber].classList.add("_active");
    navElements[activeSlideNumber].classList.add("_active");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.left = (i - activeSlideNumber) * 100 + "%";
    }
}

function change_active_slide() {
    let chosenSlideId = +this.getAttribute("data-id");
    leftArrow.classList.add("_active");
    leftArrow.addEventListener("click", onLeftArrowClick);
    rightArrow.classList.add("_active");
    rightArrow.addEventListener("click", onRightArrowClick);
    for (let i = 0; i < elements.length; i++) {
        navElements[i].classList.remove("_active");
        elements[i].classList.remove("_active");
        elements[i].style.left = (i - chosenSlideId) * 100 + "%";
    }
    elements[chosenSlideId].classList.add("_active");
    this.classList.add("_active");
    if (chosenSlideId === 0) {
        leftArrow.classList.remove("_active");
        leftArrow.removeEventListener("click", onLeftArrowClick);
    }
    if (chosenSlideId === elements.length - 1) {
        rightArrow.classList.remove("_active");
        rightArrow.removeEventListener("click", onRightArrowClick);
    }
}

function prevent_default(event) {
    event.preventDefault();
}

function open_link(event) {
    event.stopPropagation();
}

function set_default_title_width(id) {
    let textPadding;
    if (window.innerWidth <= 1140) {
        textPadding = 20;
    } else {
        textPadding = 40;
    }
    slideTitle[id].style.width = slider.clientWidth / elements.length - textPadding + "px";
}

function slide_open_on_touchscreen() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", slide_open);
        if (elements[i].classList[1] === "_active") {
            elements[i].removeEventListener("click", slide_open);
            elements[i].addEventListener("click", slide_close);
        }
        elements[i].removeEventListener("mouseenter", slide_enter);
        elements[i].removeEventListener("mouseleave", slide_leave);
    }
}

function slide_open(event) {
    event.preventDefault();
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", slide_open);
        elements[i].classList.remove("_active");
        elements[i].removeEventListener("mouseenter", slide_enter);
        elements[i].removeEventListener("mouseleave", slide_leave);
    }
    this.removeEventListener("click", slide_open);
    this.addEventListener("click", slide_close);
    this.classList.add("_active");
    for (let i = 0; i < hiddenButton.length; i++) {
        hiddenButton[i].classList.remove("hidden");
    }
    set_full_slide(this);
}

function slide_close(event) {
    event.preventDefault();
    this.removeEventListener("click", slide_close);
    this.addEventListener("click", slide_open);
    this.classList.remove("_active");
    set_default_slide();
    for (let i = 0; i < hiddenButton.length; i++) {
        hiddenButton[i].classList.add("hidden");
    }
}

function slide_enter() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mouseleave", slide_leave);
        elements[i].removeEventListener("click", slide_open);
        elements[i].removeEventListener("click", slide_close);
        elements[i].removeEventListener("click", prevent_default);
        elements[i].classList.remove("_active");
    }
    this.classList.add("_active");
    set_full_slide(this);
}

function slide_leave() {
    this.classList.remove("_active");
    set_default_slide();
}

function set_full_slide(currentSlide) {
    let currentSlideId = +currentSlide.getAttribute("data-id"); // порядковый номер текущего слайда, + - унарный оператор переводит строку в число
    slideTitle[currentSlideId].removeAttribute("style");
    for (let i = 0; i < elements.length; i++) {
        while (i <= currentSlideId) {
            elements[i].style.transform =
                "translateX(calc(((" +
                slider.clientWidth +
                "px - " +
                currentSlide.clientWidth +
                "px) * " +
                i +
                " / " +
                (elements.length - 1) +
                ") - " +
                (slider.clientWidth / elements.length) * i +
                "px ))"; // формула = (длинна уменьшенных слайдов)*i - (начальная позиция i-го слайда)
            i++;
        }
        if (i < elements.length) {
            elements[i].style.transform =
                "translateX(calc(((" +
                slider.clientWidth +
                "px - " +
                currentSlide.clientWidth +
                "px) * " +
                (i - 1) +
                " / " +
                (elements.length - 1) +
                ") - " +
                (slider.clientWidth / elements.length) * i +
                "px + " +
                currentSlide.clientWidth +
                "px))"; // формула = (длинна уменьшенных слайдов)*(i-1) - (начальная позиция i-го слайда) + (длинна текущего открытого слайда)
        }
    }
}

function set_default_slide() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute("style"); // убираем все приобретенные стили
        elements[i].style.left =
            (((slider.clientWidth / elements.length) * i) / slider.clientWidth) * 100 + "%";
        set_default_title_width(i);
    }
}

float_slide();
