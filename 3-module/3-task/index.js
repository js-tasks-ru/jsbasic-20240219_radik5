function camelize(str) {
  const arr = str.split("-"); // массив строк
  const result = arr.map((el, indx) =>
    indx === 0 ? el : el.charAt(0).toUpperCase() + el.slice(1)
  );
  return result.join("");
}

