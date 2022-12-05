function makeStrIndex(str) {
  return [...str].reduce((acc, c) => {
    acc[c] = c;
    return acc;
  }, {});
}

function getLetterPriority(letter) {
  const aCode = 'a'.charCodeAt();
  const ACode = 'A'.charCodeAt();
  const letterCode = letter.charCodeAt();

  return letterCode - aCode < 0
    ? letterCode - ACode + 27
    : letterCode - aCode + 1;
}

module.exports = {
  makeStrIndex,
  getLetterPriority,
};
