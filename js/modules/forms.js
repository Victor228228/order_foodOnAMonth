import {closeModal, modalOpen} from "./modal"; //импортируем две функции из модуля modal, что бы их было видно тут

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

    const postData = async (url, object) => { // указываем,что это async асинхронный код, далее пишем await - что не продолжать пока не загрузится. потому что ответ с сервера может идти долго
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
        form.addEventListener("submit", (event) => { // submit срабатывает каждый раз когда пытаемся отправить какую-то форму
            event.preventDefault(); // отменяет стандартное поведение браузера (например перезагрузка страницы при отправки формы)
            const spinner = document.createElement("img"); // создаем img
            spinner.src = message.loading; // прописываем у тега имг путь к картинке
            spinner.style.cssText = `display:block; margin:0 auto;`;
            form.insertAdjacentElement("afterend", spinner); // теперь добавили в форму нашь img со спинером


            const formData = new FormData(form); //new FormData - объект который позволяет с формы(form) сформировать все данные, которые заполнил пользователь/ ВАЖНО: если на импутах нет атрибута name, тогда форм дата не сможет найти этот инпут и прочитать его вэйлю
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
            }).finally(() => { // действие которое выполняется в конце всегда не зависимо от исхода кода
                form.reset();
            })

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog"); //находим див с контентом и скрываем его при отправки формы
        prevModalDialog.classList.add("hide");
        modalOpen(".modal", modalTimerId);
        const thanksModal = document.createElement("div");  // создаем новую оберту блока, в котором будет новый контент для формы с информацией о статусе отправки
        thanksModal.classList.add("modal__dialog"); // добавляем ему класс в котором стили для обертки как у старой обертки
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close = "close" class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
      `;  // помещаем в новый див штмл структуру
        document.querySelector(".modal").append(thanksModal); // теперь ищем модалку и вставляем в нее нашь новый блок
        setTimeout(() => { //таймер удаления нового модального окна с уведомлением
            thanksModal.remove(); // удаляем созданый див со статусами
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal(".modal"); // закрываем модальное окно полностью
        }, 4000);
    }

}
export default forms;
