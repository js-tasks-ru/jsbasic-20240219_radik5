function highlight(table) {
  if (table) {
    Array.from(table.rows).forEach((tr) => {
      let cellStatus = tr.cells[3];
      if (cellStatus.dataset.available) {
        if (cellStatus.dataset.available === "true") {
          tr.classList.add("available");
        }
        if (cellStatus.dataset.available === "false") {
          tr.classList.add("unavailable");
        }
      } else {
        tr.hidden = true;
      }
      let cellGender = tr.cells[2];
      if (cellGender.innerHTML === "m") {
        tr.classList.add("male");
      }
      if (cellGender.innerHTML === "f") {
        tr.classList.add("female");
      }
      let age = tr.cells[1].innerHTML;
      if (age < 18) {
        tr.style = "text-decoration: line-through";
      }
    });
  }
}
