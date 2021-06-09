"use strict";

let images = document.querySelectorAll(".gallery__item");
let modalImage = document.querySelector(".hystmodal__image");
let modalShadow = document.querySelector(".hystmodal__shadow");
let modalInner = document.querySelector(".hystmodal");
let modalCloseElements = document.querySelectorAll("[data-hystclose]");
let modalIsOpen = 0;
let tappedOnOverlay = 0;

function onImageClick() {
    // добавляем события для всех фотографий
    for (let i = 0; i < images.length; i++) {
        if (images[i].children.length) {
            // проверка на наличие потомков, не учитывает вспомогательные элементы во flex контейнере
            images[i].addEventListener("click", imageExport);
            images[i].addEventListener("click", showModal);
        }
    }
    for (let i = 0; i < modalCloseElements.length; i++) {
        modalCloseElements[i].addEventListener("click", closeModal);
    }
    window.addEventListener("keydown", function (e) {
        if (e.which == 27 && modalIsOpen) {
            // если окно открыто и была нажата клафиша ESC, то закрываем окно
            e.preventDefault();
            closeModal();
        }
    });
    document.addEventListener("mousedown", function (e) {
        const wrap = e.target.classList.contains("hystmodal__wrap"); // проверка, было ли нажатие на оверлей
        if (wrap) {
            tappedOnOverlay = 1;
        }
    });
    document.addEventListener("mouseup", function (e) {
        const wrap = e.target.classList.contains("hystmodal__wrap");
        if (wrap && tappedOnOverlay) {
            //если нажатие и отпускание мыши было на оверлее, то закрываем окно
            e.preventDefault();
            closeModal();
        }
        tappedOnOverlay = 0;
    });
}

function imageExport(e) {
    e.preventDefault(); // отключает стандартное действие по клику на ссылку внутри элемента
    if (this.children.length != 0) {
        let currentImage = this.children[0].children[0].getAttribute("src");
        modalImage.setAttribute("src", currentImage); // вставляем адрес текущей картинки в модальное окно
    }
}

function showModal() {
    if (!modalIsOpen) {
        let marginSize = window.innerWidth - document.documentElement.clientWidth; //возвращает длину скроллбара
        if (marginSize) {
            // если скроллбар есть, то смещаем весь контент
            document.getElementsByTagName("html")[0].style.marginRight = marginSize + "px";
            if (document.querySelector(".sticky")) {
                document.querySelector(".sticky").style.right = marginSize / 2 + "px";
            }
        }
        modalShadow.classList.add("hystmodal__shadow--show");
        modalInner.classList.add("hystmodal--active");
        document.body.classList.add("_active");
        modalIsOpen = 1;
    }
}
function closeModal() {
    if (modalIsOpen) {
        // возвращаем все приобретенные классы и стили
        document.getElementsByTagName("html")[0].style.marginRight = "";
        if (document.querySelector(".sticky")) {
            document.querySelector(".sticky").style.right = "";
        }
        modalShadow.classList.remove("hystmodal__shadow--show");
        modalInner.classList.remove("hystmodal--active");
        document.body.classList.remove("_active");
        modalIsOpen = 0;
    }
}

onImageClick();
