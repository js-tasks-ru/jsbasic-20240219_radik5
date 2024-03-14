function initCarousel() {
  // Получение ссылок на оперируемые объекты
  const btnRight = document.querySelector(".carousel__arrow_right");
  const btnLeft = document.querySelector(".carousel__arrow_left");
  // div Карусель - у которого мы меняем фото бэкграунда
  const divCarousel = document.querySelector(".carousel__inner");

  // Первоначальная инициализация и вычисление используемых величин
  // позиция фото в div-е Карусель
  let position = 0;
  // полная ширина div Карусель
  let divCarouselWidth = divCarousel.offsetWidth;
  // при запуске видна только правая стрелка
  btnLeft.style.display = "none";
  btnRight.style.display = "";

  // Обработчик событий
  document.addEventListener("click", function (event) {
    // Если клик пришелся не на стрелки - пропускаем обработку
    if (!isArrowClick(event, btnLeft, btnRight)) {
      return;
    }

    // Клик по левой стрелке
    if (event.target.closest("div") === btnLeft) {
      position--; // меняем номер слайда при любом клике на стрелках
      if (position == 0) {
        btnLeft.style.display = "none";
      } else {
        btnLeft.style.display = "";
      }
      if (position == 3) {
        btnRight.style.display = "none";
      } else {
        btnRight.style.display = "";
      }

      let shift = position * divCarouselWidth; //!
      divCarousel.style.transform = `translateX(-${shift}px)`;
    } else {
      position++;
      if (position == 0) {
        btnLeft.style.display = "none";
      } else {
        btnLeft.style.display = "";
      }
      if (position == 3) {
        btnRight.style.display = "none";
      } else {
        btnRight.style.display = "";
      }
      let shift = position * divCarouselWidth;
      divCarousel.style.transform = `translateX(-${shift}px)`;
    }
  });
}

function isArrowClick(event, btnLeft, btnRight) {
  if (
    event.target.closest("div") === btnLeft ||
    event.target.closest("div") === btnRight
  ) {
    return true;
  }
  return false;
}
