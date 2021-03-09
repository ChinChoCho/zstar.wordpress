"use strict";

let elements = document.querySelectorAll(".slider__item");

function float_slide() {
    //Добавляем каждому слайду события
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mouseenter", slide_enter);
        elements[i].addEventListener("mouseleave", slide_leave);
        elements[i].setAttribute("data-id", i); // Добавляем атрибуты всем слайдам, чтобы определять выбранный слайд в будущем
    }
}

function slide_enter() {
    let currentId = +this.getAttribute("data-id"); // порядковый номер текущего слайда, + - унарный оператор переводит строку в число
    for (let i = 0; i < elements.length; i++) {
        while (i <= currentId) {
            elements[i].style.transform = // формула = (длинна уменьшенных слайдов)*i - (начальная позиция i-го слайда)
                "translateX(calc(((1170px - 697px) * " +
                i +
                " / 2) - " +
                (1170 / elements.length) * i +
                "px ))";
            i++;
        }
        if (i < elements.length) {
            // условие, чтобы избежать ошибок, при наведении на последний элемент слайдера
            elements[i].style.transform = // формула = (длинна развернутого слайда) + (длинна уменьшенных слайдов)*(i-1) - (начальная позиция i-го слайда)
                "translateX(calc(697px - " +
                (1170 / elements.length) * i +
                "px + (1170px - 697px) * " +
                (i - 1) +
                " / 2))";
        }
    }
}

function slide_leave() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute("style"); // убираем все приобретенные стили
    }
}

float_slide();
