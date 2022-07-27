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

    const getResource = async (url) => { // указываем,что это async асинхронный код, далее пишем await - что не продолжать пока не загрузится
        const res = await fetch(url);
        if (!res.ok) {  // проверяем статус запроса res.ok, если не ОК, то..
            throw new Error(`Could not fetch ${url}, статус: ${res.status}`);  //new Error - объект ошибки//// оператор throw выкидывает новую ошибку в консоль
        }
        return await res.json();  // await дожидаемся ответа с сервера
    };

    getResource("http://localhost:3000/menu")
        .then(data => {  //data - это данный res.json() которые придут с сервера
            data.forEach((item) => { // data с сервера приходит массив, который можно перебрать
                new MenuCard(item.img, item.altimg, item.title, item.descr, item.price).addToPage();
            });
        });

}
export default cards;
