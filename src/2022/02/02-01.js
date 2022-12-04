#!/usr/bin/env node

const { stream2str } = require('../../helpers/stream2str');
const {
  ME_MOVEMENTS,
  MOVEMENT_SCORE,
  OPPONENT_MOVEMENTS,
  ROUND_SCORES,
  VS_MOVEMENTS_RESULT,
} = require('./constants');

async function main(readableStream) {
  const content = await stream2str(readableStream);

  return content
    .split('\n')
    .map((line) => line.split(' '))
    .map(([opponent, me]) => {
      return (
        MOVEMENT_SCORE[ME_MOVEMENTS[me]] +
        ROUND_SCORES[
          VS_MOVEMENTS_RESULT[
            `${ME_MOVEMENTS[me]}${OPPONENT_MOVEMENTS[opponent]}`
          ]
        ]
      );
    })
    .reduce((totalScore, score) => totalScore + score, 0);
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
