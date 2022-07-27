/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

    /////// Calculator
    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio = 1.375;

    if (localStorage.getItem("sex")) {  // getItem (getItem получаем значение) проверяем есть ли в локас сторедже значения, если да,то берем их,если нет, то указываем значение по умолчанию и добавляем его в локал сторедж
        sex = localStorage.getItem("sex");
    } else {
        sex = "female";
        localStorage.setItem("sex", "female");
    }

    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375);
    }

    function initLocalSettings(selector, activeClass) { // функция для установки активности по умолчанию в зависимости от того,что в локал сторедж
        const elements = document.querySelectorAll(selector);
        elements.forEach(function (item) {
            item.classList.remove(activeClass);
            if (item.getAttribute("id") === localStorage.getItem("sex")) { // если в айтеме есть атрибут getAttribute("id") (id равен майл или фамили), который равен значению в локал сторедж  sex(мейл или фамили), то
                item.classList.add(activeClass);
            }
            if (item.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
                item.classList.add(activeClass);
            }
        });
    }
    initLocalSettings("#gender","calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big","calculating__choose-item_active");

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) { // если хотя бы одно из этих значений не заполнено, то не считаем дальше
            result.textContent = "Заполните все поля";
            return; // досрочно прерываем функцию calcTotal, все действия ниже этого условия идти не будут
        }
        if (sex ==="female") { // если в переменной sex выбранно женщина
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); // Math.round - округляет до ближайшего целого
        } else { // иначе мужчина
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal(); // вызываем ее в начале, что бы показать пользователю,что он еще не заполнил формы

    function  getStaticInformation (parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`); // ищем все дивы в обертке,что бы убирать у них у всех класс активности

        elements.forEach(function (item) {
            item.addEventListener("click", (event) => { // вешаем слушатель на родителя
                if (event.target.getAttribute("data-ratio")) { // у элемента по которому произошел клик берём атрибут
                    ratio = +event.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", ratio); // дабавляем данные в локальное хранилеще
                } else {
                    sex = event.target.getAttribute("id");
                    localStorage.setItem("sex", sex);  // дабавляем данные в локальное хранилеще
                }
                console.log(ratio, sex);
                elements.forEach(function (item) {
                    item.classList.remove(activeClass);
                });
                event.target.classList.add(activeClass);

                calcTotal();
            });
        });

        /*
           document.querySelector(parentSelector).addEventListener("click", (event) => { // вешаем слушатель на родителя
             if (event.target.getAttribute("data-ratio")) { // у элемента по которому произошел клик берём атрибут
               ratio = +event.target.getAttribute("data-ratio");
             } else {
               sex = event.target.getAttribute("id");
             }
             console.log(ratio, sex);
             elements.forEach(function (item) {
               item.classList.remove(activeClass);
             });
             event.target.classList.add(activeClass);

             calcTotal();
           });
           */


    }
    getStaticInformation("#gender", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

    function getDynamicInformation (selector) { // для инпутов в которых производится ввод значений
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            if (input.value.match(/\D/g)) {  // match(/\D/g) если в инпуте не число
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            switch (input.getAttribute("id")) { // если у импута есть id с
                case "height":        // id с ростом, то записываем в нее импут и прерываем исловие break
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }
    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards () {
    /// Классы для карточек
    class MenuCard {
        constructor(src, alt, title, description, price) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.transfer = 50;
            this.changeToRu(); // вызываем его прям в конструкторе
        }
        changeToRu () {
            this.price = this.price * this.transfer;
        }
        addToPage () {
            const parentsDiv = document.querySelector(".field_container");
            parentsDiv.insertAdjacentHTML("beforeend", `
        <div class="menu__item">
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
         </div>
      `)
        }
    }

    const getResource = async (url) => { // указываем,что это async асинхронный код, далее пишем await - что не продолжать пока не загрузится. потому что ответ с сервера может идти долго, по этому нужно дождаться его
        const res = await fetch(url);
        if (!res.ok) {  // проверяем статус запроса res.ok, если не ОК, то..
            throw new Error(`Could not fetch ${url}, статус: ${res.status}`);  //new Error - объект ошибки//// оператор throw выкидывает новую ошибку в консоль
        }
        return await res.json();  // await дожидаемся ответа с сервера
    };

    getResource("http://localhost:3000/menu")
        .then(data => {  //data - это вот эти данный res.json() котрые придут с сервера
            data.forEach((item) => { // data с сервера приходит массив, который можно перебрать
                new MenuCard(item.img, item.altimg, item.title, item.descr, item.price).addToPage();
            });
        });

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
 //импортируем две функции из модуля modal, что бы их было видно тут

function forms(modalTimerId) {

    // Data Forms to server
    const forms = document.querySelectorAll("form");
    forms.forEach((item) => {
        bindPostData(item);
    })

    const message = {
        loading:"img/spinner.svg",
        success:"Спасибо скоро свяжимся",
        failure:"что-то пошло не так"
    };

    const postData = async (url, object) => { // указываем,что это async асинхронный код, далее пишем await - что не продолжать пока не загрузится. потому что ответ с сервера может идти долго, по этому нужно дождаться его
        const res = await fetch(url, {  // await дожидаемся пока отправит на сервер
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: object
        });
        return await res.json();  // await дожидаемся ответа с сервера
    };

    function bindPostData(form) { // функция которая будет отправлять данные на сервер через JSON
        form.addEventListener("submit", (event) => { // submit срабатывает каждый раз когда пытаемся отправить какую то форму
            event.preventDefault(); // отменяет стандартное поведение браузера (например перезаггрузка страницы при отправки формы)
            const spinner = document.createElement("img"); // создаем img
            spinner.src = message.loading; // прописываем у тега имг путь к квартинке
            spinner.style.cssText = `display:block; margin:0 auto;`;
            form.insertAdjacentElement("afterend", spinner); // теперь добавили в форму нашь img со спинером


            const formData = new FormData(form); //new FormData - объект который позволяет с формы(form) сформировать все данные, которые заполнил пользователь/ ВАЖНО: если на импутах нет атрибута name, тогда фром дата не сможет найти этот инпут и прочитать его вэйлю
            const object = {  // создаем объект в который мы переберем через фор ич formData и запишем то что перебереться в этот объект

            }
            formData.forEach((item,index) => {  // перебираем то что сидит const formData = new FormData(form); и записываем это в объект. и теперь мы получаем обычный объект object, а не new FormData
                object[index] = item;
            });


            //Создаем запрос на сервер при помощи Fetch, в этом примере JSON
            postData("http://localhost:3000/requests", JSON.stringify(object))
                .then(data => {  // data - данные который вернул сервер из промиса  body: formData
                    console.log(data);
                    showThanksModal(message.success);
                    spinner.remove();
                }).catch(() => { // catch если будет ошибка, то выполнить действия ниже
                showThanksModal(message.failure);
            }).finally(() => { // действие которое выполняется в конце всегда е зависимо от исхода кода
                form.reset();
            })

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog"); //находим див с контентом и скрываем его при отправки формы
        prevModalDialog.classList.add("hide");
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)(".modal", modalTimerId);
        const thanksModal = document.createElement("div");  // создаем новую оберту блока, в котором будет новый контент для формы с информацией о статусе отправки
        thanksModal.classList.add("modal__dialog"); // обавляем ему класс в котором стили для обертку как у старой обертки
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close = "close" class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
      `;  // помещаем в новый див штмл структуру
        document.querySelector(".modal").append(thanksModal); // теперь ищем модалку и вставляем в нее нашь новый блок
        setTimeout(() => { //иаймер удаления нового модального окна с уведомлением
            thanksModal.remove(); // удвляем созданый див с статусами
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal"); // закрываем модальное окно полностью
        }, 4000);
    }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "modalOpen": () => (/* binding */ modalOpen)
/* harmony export */ });
function modalOpen (modalSelector, modalTimerId) {  // поднимаем их выше, что бы экспортировать отдельно. для того ,что бы в модуле с формами импортировать их
    const modal = document.querySelector(modalSelector); // дублирование необходимо, так как у нас нет доступа к переменным,которые объявлены в функции modal
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden"; // что бы документ не скролился при открытии модального окна

    if (modalTimerId) {
        clearInterval(modalTimerId); // отменять таймер, если пользователь сам открыл модальное окно
    }

}
function closeModal (modalSelector) {   // поднимаем их выше, что бы экспортировать отдельно. для того ,что бы в модуле с формами импортировать их
    const modal = document.querySelector(modalSelector);
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "";
}


function modal (trigerSelector, modalSelector, modalTimerId) {
    //Modal Window
    const modalTrigger = document.querySelectorAll(trigerSelector);
    const modalCloseBtn = document.querySelector("[data-close]");
    const modal = document.querySelector(modalSelector);
    const dataCall = document.querySelector("[data-call]");


    /*const modalTimerId = setTimeout(function () {
        modalOpen(modalSelector);
    }, 10000);*/


    /*function modalOpen () {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden"; // что бы документ не скролился при открытии модального окна
        clearInterval(modalTimerId); // отменять таймер, если пользователь сам открыл модальное окно
    }*/


    modalTrigger.forEach(function (item) {
        item.addEventListener("click", function (event) {
            modalOpen(modalSelector, modalTimerId);
        })
    })

    function modalClose () {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal(modalSelector);
            }
            if (event.target.getAttribute("data-close") === "close") {
                closeModal(modalSelector);
            }
        })
    }
    /*function closeModal () {
        modal.classList.remove("show");
        modal.classList.add("hide");
        document.body.style.overflow = "";
    }*/

    modalClose();
    window.addEventListener("keydown", function (event) {
        //// event.code - показывает на какой клавише произошло событие
        if (event.code === "Escape" && modal.classList.contains("show")) { // modal.classList.contains("show") - провереям на наличие класса СШОВ в модальном окне, что бы работало только при открытом модальном окне
            closeModal(modalSelector);
        }
    })

    function showModalByScroll () {
        //window.pageYOffset - прокрученная часть страницы, сколько пикселей прокрученно сверху по оси Y
        //document.documentElement.clientHeight - видимая часть страницы, которую видим в данный момент
        // document.documentElement.scrollHeight полная высота элемента с учетом прокрутки которая была сверху
        // прокрученная часть страницы + видимая часть страницы равняется полная высоте элемента
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {  // то значит пользователь долистал до конца страницы
            modalOpen(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll); // после выполнения удаляем нашь слушатель
        }
    }
    window.addEventListener("scroll", showModalByScroll);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    //Slider

    /*
    const arrSliderImgs = [
        "img/slider/pepper.jpg",
        "img/slider/paprika.jpg",
        "img/slider/olive-oil.jpg",
        "img/slider/food-12.jpg"
    ];
    const sliderImg = document.querySelector(".sliderImg");
    const offerSliderPrev = document.querySelector(".offer__slider-prev");
    const offerSliderNext = document.querySelector(".offer__slider-next");
    const currentIndexSlider = document.querySelector("#current");
    const totalIndexSlider = document.querySelector("#total");

    let indexSlider = 0;
    sliderImg.src = arrSliderImgs[indexSlider];
    currentIndexSlider.textContent = +indexSlider + 1;

    offerSliderPrev.addEventListener("click", function (event) {
      if (indexSlider > 0) {
        indexSlider--;
        sliderImg.src = arrSliderImgs[indexSlider]
        currentIndexSlider.textContent = +indexSlider + 1;
      }
    });
    offerSliderNext.addEventListener("click", function (event) {
      if (indexSlider < arrSliderImgs.length -1) {
        indexSlider++;
        sliderImg.src = arrSliderImgs[indexSlider]
        currentIndexSlider.textContent = +indexSlider + 1;
      }
    });
    totalIndexSlider.textContent = +arrSliderImgs.length;

    */


    /*
     function Slider () {
       this.sliderImg = document.querySelector(".sliderImg");
       this.offerSliderPrev = document.querySelector(".offer__slider-prev");
       this.offerSliderNext = document.querySelector(".offer__slider-next");
       this.currentIndexSlider = document.querySelector("#current");
       this.totalIndexSlider = document.querySelector("#total");
       this.arrSliderImgs = [];
       this.indexSlider = 0;
     }

     Slider.prototype.start = function () {
       this.arrSliderImgs.push("img/slider/pepper.jpg");
       this.arrSliderImgs.push("img/slider/paprika.jpg");
       this.arrSliderImgs.push("img/slider/olive-oil.jpg");
       this.arrSliderImgs.push("img/slider/food-12.jpg");
       this.sliderImg.src = this.arrSliderImgs[this.indexSlider];
       this.currentIndexSlider.textContent = this.indexSlider + 1;
       this.totalIndexSlider.textContent = this.arrSliderImgs.length;

       let that = this;
       this.offerSliderPrev.addEventListener("click", function (event) {
         that.clickPrev();
       });
       this.offerSliderNext.addEventListener("click", function (event) {
         that.clickNext();
       });
     }
     Slider.prototype.clickPrev = function (event) {
       if (this.indexSlider > 0) {
         this.indexSlider--;
         this.sliderImg.src = this.arrSliderImgs[this.indexSlider]
         this.currentIndexSlider.textContent = this.indexSlider + 1;
       }
     }
     Slider.prototype.clickNext = function (event) {
       if (this.indexSlider < this.arrSliderImgs.length -1) {
         this.indexSlider++;
         this.sliderImg.src = this.arrSliderImgs[this.indexSlider]
         this.currentIndexSlider.textContent = this.indexSlider + 1;
       }
     }

     const slider1 = new Slider();
     slider1.start();

   */



    const sliders = document.querySelectorAll(".offer__slide");
    const offerSliderPrev = document.querySelector(".offer__slider-prev");
    const offerSliderNext = document.querySelector(".offer__slider-next");
    const currentIndexSlider = document.querySelector("#current");
    const totalIndexSlider = document.querySelector("#total");
    let indexSlider = 0;

    function showSliders (index) {
        if (sliders.length < 10) {
            totalIndexSlider.textContent = `0${sliders.length}`;
        } else {
            totalIndexSlider.textContent = sliders.length;
        }
        if (index < 10) {
            currentIndexSlider.textContent = `0${index +1}`;
        } else {
            currentIndexSlider.textContent = index +1;
        }

        sliders.forEach(function (item) {
            item.style.display = "none";
        });
        sliders[index].style.display = "block";

        console.log(indexSlider);
    }

    showSliders(indexSlider);

    offerSliderPrev.addEventListener("click", function () {
        if (indexSlider <= 0) {
            indexSlider = sliders.length -1;
            showSliders(indexSlider);
        } else {
            indexSlider--;
            showSliders(indexSlider);
        }
    });

    offerSliderNext.addEventListener("click", function () {
        indexSlider++;
        if (indexSlider >= sliders.length) {
            indexSlider = 0;
            showSliders(indexSlider);
        } else {
            showSliders(indexSlider);
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    //Tabs
    const tabsParent = document.querySelector(".tabheader__items");
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabsContent = document.querySelectorAll(".tabcontent");

    function hideTabContent () {
        tabsContent.forEach(function (item) {
            item.classList.add("hide");
            item.classList.remove("show");
            item.classList.remove("fade");
        });
        tabs.forEach(function (item) {
            item.classList.remove("tabheader__item_active");
        })
    }

    function showTabContent (i = 0) {  // i = 0 таким способом можно задать параметр по умолчанию, если в функцию ничего не передавать при запуске, то i будет равен 0
        tabsContent[i].classList.add("show");
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("fade");

        tabs[i].classList.add("tabheader__item_active");
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", function (event) {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach(function (item, index) {
                if (target === item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    })
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs); // экспортируем функцию tabs


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {

    // Timer
    const deadLIne = "2022-12-31"; // конеченое время таймера
    function getTimeRemaining (endTime) { // функция которая вычисляет время между дедлайном deadLIne и текущей датой. в endTime приходит deadLIne
        const time = Date.parse(endTime) - new Date(); //Date.parse(endTime) преобразовываем нашу строку deadLIne со временеми в число в миллисекундах.... дальше отнимаем ее от текущего времени
        const days = Math.floor(time / (1000 * 60 * 60 * 24)); // Math.floor() - округление до ближайшего целого.. (1000 * 60)-сколько миллисек в минуте, (1000 * 60)*60 - в часе, (1000 * 60)*60*24 - дней
        const hours = Math.floor((time / (1000 * 60 * 60) % 24)); // (time / (1000 * 60 * 60)- мы получаем общее количество часов, которое осталось, а нам надо взять остаток от деления на дни, и этото остаток записать в часы
        const minutes = Math.floor((time / 1000 / 60) % 60); //(time / 1000 / 60) получаем количество минут и проецнт от минут(60),что бы отобразить остаток
        const seconds = Math.floor((time / 1000) % 60);

        return { // что бы вернуть наши переменные,которые заданны локально в функции,что бы к ним был доступ вне функции, мы будем возарщаться объект в котором будут переменные с нашими свойства
            "total": time,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds,
        };
    }

    function getZero (num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) { //функция которая устанавливает часы на страницу// selector - родительский див таймерв/// endTime наше конечное время deadLIne
        const timer = document.querySelector(selector);
        const days = timer.querySelector("#days");
        const hours = timer.querySelector("#hours");
        const minutes = timer.querySelector("#minutes");
        const seconds = timer.querySelector("#seconds");
        const timeInterval = setInterval(updateClock, 1000); // timeInterval будет заускать функцию updateClock каждую секунду

        updateClock(); // запускаем эту функцию, что бы не ждать секунды в timeInterval, что бы сразу отобразился таймер на странице, а не через сукунду
        function updateClock() {
            const time = getTimeRemaining(endTime);
            days.innerHTML = getZero(time.days);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);

            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(".timer", deadLIne);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");










window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(function () {
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.modalOpen)(".modal", modalTimerId);
  }, 10000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])(modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();
});




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map