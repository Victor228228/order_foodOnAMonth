function timer() {

    // Timer
    const deadLIne = "2022-12-31"; // конеченое время таймера
    function getTimeRemaining (endTime) { // функция которая вычисляет время между дедлайном deadLIne и текущей датой. в endTime приходит deadLIne
        const time = Date.parse(endTime) - new Date(); //Date.parse(endTime) преобразовываем нашу строку deadLIne со временем в число в миллисекундах.... дальше отнимаем ее от текущего времени
        const days = Math.floor(time / (1000 * 60 * 60 * 24)); // Math.floor() - округление до ближайшего целого.. (1000 * 60)-сколько миллисек в минуте, (1000 * 60)*60 - в часе, (1000 * 60)*60*24 - дней
        const hours = Math.floor((time / (1000 * 60 * 60) % 24)); // (time / (1000 * 60 * 60)- мы получаем общее количество часов, которое осталось, а нам надо взять остаток от деления на дни, и этот остаток записать в часы
        const minutes = Math.floor((time / 1000 / 60) % 60); //(time / 1000 / 60) получаем количество минут и процент от минут(60),что бы отобразить остаток
        const seconds = Math.floor((time / 1000) % 60);

        return { // что бы вернуть наши переменные,которые заданны локально в функции,что бы к ним был доступ вне функции, мы будем возвращать объект в котором будут переменные с нашими свойства
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
        const timeInterval = setInterval(updateClock, 1000); // timeInterval будет запускать функцию updateClock каждую секунду

        updateClock(); // запускаем эту функцию, что бы не ждать секунду в timeInterval, что бы сразу отобразился таймер на странице, а не через секунду
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
export default timer;
