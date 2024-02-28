function checkSpam(str) {
  // const regexp = /1xBet|XXX/i;
  // return regexp.test(str);
  let strLowerCase = str.toLowerCase();
  return strLowerCase.includes("1xbet") || strLowerCase.includes("xxx");
}
