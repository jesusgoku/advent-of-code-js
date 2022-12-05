#!/usr/bin/env node

const { stream2str } = require('../../helpers/stream2str');
const { makeStrIndex, getLetterPriority } = require('./helpers');

async function main(readableStream) {
  const content = await stream2str(readableStream);

  return content
    .split('\n')
    .reduce((acc, line, index) => {
      const groupSize = 3;
      const groupIndex = Math.floor(index / groupSize);

      acc[groupIndex] = [...(acc[groupIndex] || []), line];

      return acc;
    }, [])
    .map((group) => group.map((line) => makeStrIndex(line)))
    .map(([first, second, third]) => {
      for (let i = 65; i <= 90; ++i) {
        const letter = String.fromCharCode(i);
        let count = 0;
        count += letter in first ? 1 : 0;
        count += letter in second ? 1 : 0;
        count += letter in third ? 1 : 0;

        if (count === 3) return letter;
      }

      for (let i = 97; i <= 122; ++i) {
        const letter = String.fromCharCode(i);

        let count = 0;
        count += letter in first ? 1 : 0;
        count += letter in second ? 1 : 0;
        count += letter in third ? 1 : 0;

        if (count === 3) return letter;
      }
    })
    .map((letter) => getLetterPriority(letter))
    .reduce((acc, n) => acc + n, 0);
}

// istanbul ignore next
if (require.main === module) {
  main(process.stdin).then((res) => {
    console.log(res);
  });
} else {
  module.exports = {
    main,
  };
}
