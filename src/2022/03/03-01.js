#!/usr/bin/env node

const { stream2str } = require('../../helpers/stream2str');
const { makeStrIndex, getLetterPriority } = require('./helpers');

async function main(readableStream) {
  const content = await stream2str(readableStream);

  return content
    .split('\n')
    .map((line) => [
      line.slice(0, line.length / 2),
      line.slice(line.length / 2),
    ])
    .map(([first, second]) => [makeStrIndex(first), second])
    .map(([firstIndex, second]) => {
      return [...second].reduce((repeated, letter) => {
        if (repeated) return repeated;

        if (letter in firstIndex) {
          repeated = letter;
        }

        return repeated;
      }, undefined);
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
