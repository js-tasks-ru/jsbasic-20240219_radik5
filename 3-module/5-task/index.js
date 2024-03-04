function getMinMax(str) {
  const matches = str.match(/(-?\d+(\.\d+)?)/g);
  return {
    min: Math.min(...matches),
    max: Math.max(...matches),
  };
}
