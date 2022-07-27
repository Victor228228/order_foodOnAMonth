import tabs  from "./modules/tabs";
import modal  from "./modules/modal";
import timer  from "./modules/timer";
import cards  from "./modules/cards";
import calc  from "./modules/calc";
import forms  from "./modules/forms";
import slider  from "./modules/slider";

import {modalOpen} from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(function () {
    modalOpen(".modal", modalTimerId);
  }, 10000);

  tabs();
  modal("[data-modal]", ".modal", modalTimerId);
  timer();
  cards();
  calc();
  forms(modalTimerId);
  slider();
});



