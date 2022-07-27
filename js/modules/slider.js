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
export default slider;
