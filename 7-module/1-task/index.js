import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.renderRibbon();
    this.initView();
    this.createEventListenerBtnLeftRight();
    this.createEventListenerScrollRibbonInner();
    this.createEventListenerLink();
  }
  // 
  renderRibbon() {
    return createElement(`
    <!--Корневой элемент RibbonMenu-->
    <div class="ribbon">
    <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <!--Ссылки на категории-->
      <nav class="ribbon__inner"></nav>
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
  `);
  }

  initView() {
    this.btnRight = this.elem.querySelector(".ribbon__arrow_right");
    this.btnLeft = this.elem.querySelector(".ribbon__arrow_left");
    this.ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.makeProperViewBtnLeftRight();
    this.categories.forEach((category) => {
      this.ribbonInner.append(
        createElement(
          `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
        )
      );
    });
  }

  createEventListenerLink() {
    this.elem.addEventListener("click", (event) => {
      let link = event.target.closest("a");
      if (link) {
        event.preventDefault();
        let parentNav = link.parentNode;
        for (let lnk of parentNav.childNodes) {
          lnk.classList.remove("ribbon__item_active");
        }
        link.classList.add("ribbon__item_active");
        let customEvent = new CustomEvent("ribbon-select", {
          // имя события должно быть именно 'ribbon-select'
          detail: link.dataset.id, // уникальный идентификатора категории из её объекта
          bubbles: true, // это событие всплывает - это понадобится в дальнейшем
        });
        this.elem.dispatchEvent(customEvent);
      }
    });
  }

  createEventListenerScrollRibbonInner() {
    this.elem.addEventListener("scroll", (event) => {
      if (event.target.closest("nav") === this.ribbonInner) {
        makeProperViewBtnLeftRight();
      }
    });
  }

  createEventListenerBtnLeftRight() {
    // Обработчик событий вправо влево
    this.elem.addEventListener("click", (event) => {
      if (!this.checkIsBtnLeftOrRight(event)) {
        return;
      }
      if (event.target.closest("button") === this.btnLeft) {
        this.ribbonInner.scrollBy(-350, 0);
      } else {
        this.ribbonInner.scrollBy(350, 0);
      }
    });
  }
  calculateScrollLeft() {
    return this.ribbonInner.scrollLeft;
  }
  calculateScrollRight() {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth; // число пикселей, например, 100 или 0.
    return scrollRight;
  }
  makeProperViewBtnLeftRight() {
    if (this.calculateScrollLeft() === 0) {
      this.btnLeft.classList.add("ribbon__arrow_visible");
      this.btnRight.classList.remove("ribbon__arrow_visible");
    }
    if (this.calculateScrollRight < 1) {
      this.btnLeft.classList.remove("ribbon__arrow_visible");
      this.btnRight.classList.add("ribbon__arrow_visible");
    }
  }
  checkIsBtnLeftOrRight(event) {
    if (
      event.target.closest("button") === this.btnLeft ||
      event.target.closest("button") === this.btnRight
    ) {
      return true;
    }
    return false;
  }
}
