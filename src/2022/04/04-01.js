#!/usr/bin/env node

const { stream2str } = require('../../helpers/stream2str');
const { Range } = require('./range');

async function main(readableStream) {
  const content = await stream2str(readableStream);

  return content
    .split('\n')
    .map((line) => line.split(','))
    .map((pair) => pair.map((item) => item.split('-')))
    .map((pair) =>
      pair.map((limits) => limits.map((limit) => parseInt(limit, 10))),
    )
    .map((pair) => pair.map((range) => new Range(range)))
    .map(([first, second]) => first.contains(second) || second.contains(first))
    .reduce((acc, isContain) => acc + (isContain ? 1 : 0), 0);
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
