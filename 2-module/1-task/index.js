function sumSalary(salaries) {
  let result = 0;
  for (const key in salaries) {
    const value = salaries[key];
    if (typeof value === "number" && isFinite(value)) {
      result += value;
    }
  }
  return result;
}