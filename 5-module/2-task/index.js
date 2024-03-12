function toggleText() {
  let txtField = document.querySelector("#text");
  document.addEventListener("click", function (event) {
    let btn = document.querySelector(".toggle-text-button");
    if (btn === event.target) {
      txtField.hidden = !txtField.hidden;
    }
  });
}