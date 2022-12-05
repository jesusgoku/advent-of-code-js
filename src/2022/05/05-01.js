#!/usr/bin/env node

const { stream2str } = require('../../helpers/stream2str');
const { isNumericPattern, getBoxesFromLine } = require('./helpers');

async function main(readableStream) {
  const content = await stream2str(readableStream);

  const { stacks, movements } = content.split('\n').reduce(
    (acc, line, index) => {
      if (index === 0) {
        acc.stacks = new Array(Math.floor(line.length / 3)).fill([]);
      }

      if (line.trim() === '') {
        return acc;
      } else if (line.startsWith('move')) {
        const [quantity, from, to] = line
          .split(' ')
          .filter((chunk) => isNumericPattern.test(chunk))
          .map((n) => parseInt(n, 10));

        acc.movements.push({ quantity, from, to });
      } else {
        const boxes = getBoxesFromLine(line, acc.stacks.length);

        if (isNumericPattern.test(boxes[0])) return acc;

        boxes.forEach((box, index) => {
          if (box) acc.stacks[index] = [box, ...acc.stacks[index]];
        });
      }

      return acc;
    },
    { stacks: [], movements: [] },
  );

  movements.forEach(({ quantity, from, to }) => {
    for (let i = 0; i < quantity; ++i) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  });

  return stacks.reduce((acc, stack) => `${acc}${stack.pop() || ''}`, '');
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
