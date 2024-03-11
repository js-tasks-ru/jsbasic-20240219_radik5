function makeDiagonalRed(table) {
  if (table) {
    Array.from(table.rows).forEach((tr, rowIndex) => {
      Array.from(tr.cells || []).forEach((cell, cellIndex) => {
        if (cellIndex === rowIndex) {
          cell.style.backgroundColor = "red";
        }
      });
    });
  }
}