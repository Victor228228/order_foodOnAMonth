function calc() {

    /////// Calculator
    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio = 1.375;

    if (localStorage.getItem("sex")) {  // getItem (getItem получаем значение) проверяем есть ли в локал сторедже значения, если да,то берем их,если нет, то указываем значение по умолчанию и добавляем его в локал сторедж
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
        if (!sex || !height || !weight || !age || !ratio) { // если хотя бы одно из этих значений не заполнено, то не идем дальше
            result.textContent = "Заполните все поля";
            return; // досрочно прерываем функцию calcTotal, все действия ниже этого условия идти не будут
        }
        if (sex ==="female") { // если в переменной sex выбранно женщина
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); // Math.round - округляет до ближайшего целого
        } else { // иначе мужчина
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal(); // вызываем ее вначале, что бы показать пользователю,что он еще не заполнил формы

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
export default calc;
