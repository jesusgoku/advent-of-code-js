const isNumericPattern = /^\d+$/;

function getBoxesFromLine(line, stacksLength) {
  return new Array(stacksLength).fill().reduce((acc, _, index) => {
    const start = index * 4;

    acc.push(line.slice(start + 1, start + 2).trim());

    return acc;
  }, []);
}

module.exports = {
  isNumericPattern,
  getBoxesFromLine,
};
