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

    function showTabContent (i = 0) {  // i = 0 таким способом можно задать параметр поумолчанию, если в функцию ничего не передавать при запуске, то i будет равен 0
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
export default tabs; // экспортируем функцию tabs
