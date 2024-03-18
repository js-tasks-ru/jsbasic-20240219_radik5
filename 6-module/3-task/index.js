import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.position = 0;
    this.slides = slides;

    // создание каркаса узла, в котором будут располагатся слайды
    this.elem = this.renderCarousel();

    // добавление слайдов
    this.appendSlidesToCarousel(slides);

    // добавление обработчика события "добавить в заказ"
    this.addEventListenerToProductAddButton();

    // добавление обработчика кликов по кнопкам прокрутки слайдов
    this.addEventListenerToScrollSlidesLeftRight();

    // инициализация показа страницы
    this.btnLeft = this.elem.querySelector(".carousel__arrow_left");
    // Получение ссылок на оперируемые объекты
    this.btnRight = this.elem.querySelector(".carousel__arrow_right");
    this.divCarousel = this.elem.querySelector(".carousel__inner");
    // Показываем кнопки прокрутки слайдов в правильном виде
    this.makeProperViewBtnLeftRight();
  }

  makeProperViewBtnLeftRight() {
    if (this.position == 0) {
      this.btnRight.style.display = "";
      this.btnLeft.style.display = "none";
    }
    if ((this.position < this.slides.length - 1) & (this.position > 0)) {
      this.btnRight.style.display = "";
      this.btnLeft.style.display = "";
    }
    if (this.position === this.slides.length - 1) {
      this.btnRight.style.display = "none";
      this.btnLeft.style.display = "";
    }
  }
  renderCarousel() {
    return createElement(`
    <div class="carousel">
      <!--Кнопки переключения-->
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon"/>
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon"/>
      </div>
      <div class="carousel__inner"></div>
    </div>
  `);
  }
  appendSlidesToCarousel(slides) {
    let appendNode = this.elem.querySelector(".carousel__inner");
    for (let slide of slides) {
      let nodeSlide = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide"/>
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon"/>
            </button>
          </div>
        </div>
      `);
      appendNode.appendChild(nodeSlide);
    }
  }
  addEventListenerToProductAddButton() {
    this.elem.addEventListener("click", (event) => {
      if (event.target.closest("button")) {
        let btnNode = event.target.closest("button");
        let slideNode = btnNode.parentElement.parentElement;
        let id = slideNode.dataset.id;
        let customEvent = new CustomEvent("product-add", {
          detail: id, // Уникальный идентификатора товара из объекта товара
          bubbles: true, // это событие всплывает - это понадобится в дальнейшем
        });
        this.elem.dispatchEvent(customEvent);
      }
    });
  }
  checkIsBtnLeftOrRight(event) {
    if (
      event.target.closest("div") === this.btnLeft ||
      event.target.closest("div") === this.btnRight
    ) {
      return true;
    }
    return false;
  }
  addEventListenerToScrollSlidesLeftRight() {
    // Обработчик событий вправо влево
    this.elem.addEventListener("click", (event) => {
      let divCarouselWidth = this.divCarousel.offsetWidth;
      if (!this.checkIsBtnLeftOrRight(event)) {
        return;
      }
      if (event.target.closest("div") === this.btnLeft) {
        this.position--;
      } else {
        this.position++;
      }
      // Показываем кнопки прокрутки слайдов в правильном виде
      this.makeProperViewBtnLeftRight();
      let shift = this.position * divCarouselWidth;
      this.divCarousel.style.transform = `translateX(-${shift}px)`;
    });
  }
}