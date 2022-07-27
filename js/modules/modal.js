function modalOpen (modalSelector, modalTimerId) {  // поднимаем их выше, что бы экспортировать отдельно. для того ,что бы в модуле с формами импортировать их
    const modal = document.querySelector(modalSelector); // дублирование необходимо, так как у нас нет доступа к переменным,которые объявлены в функции modal
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden"; // что бы документ не скролился при открытии модального окна

    if (modalTimerId) {
        clearInterval(modalTimerId); // отменять таймер, если пользователь сам открыл модальное окно
    }
}
function closeModal (modalSelector) {   // поднимаем их выше, что бы экспортировать отдельно. для того ,что бы в модуле с формами импортировать
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
        if (event.code === "Escape" && modal.classList.contains("show")) { // modal.classList.contains("show") - провереям на наличие класса show в модальном окне, что бы работало только при открытом модальном окне
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
export default modal;
export {closeModal};
export {modalOpen};
