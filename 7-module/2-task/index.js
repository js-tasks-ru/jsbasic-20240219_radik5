import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
    this.elem.addEventListener('click', this.onClick);
  }

  render() {
    // создание modelBody
    // let modalBody = createElement(`
    this.elem = createElement(`
    <!--Корневой элемент Modal-->
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>  
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>  
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>  
    </div>
    `);  
  }

  onClick = (event) => {
    if (event.target.closest('.modal__close')) {
      event.preventDefault();
      this.close();
    }
  }
 
  onDocumentKeyDown = (event) => {
    if (event.code === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }


  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.elem);
    document.addEventListener('keydown', this.onDocumentKeyDown);
  }
  setBody(node) {
    let modalBody = this.elem.querySelector(".modal__body");
    modalBody.innerHTML = '';
    modalBody.append(node);
  }
  setTitle(strHeader = "") {
    let modalTitle = this.elem.querySelector(".modal__title");
    modalTitle.textContent = strHeader;
  }
  close() {
    document.removeEventListener('keydown', this.onDocumentKeyDown);
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
  }
}
