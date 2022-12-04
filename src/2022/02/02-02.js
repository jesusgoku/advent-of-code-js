#!/usr/bin/env node

const { stream2str } = require('../../helpers/stream2str');
const {
  MOVEMENT_SCORE,
  OPPONENT_MOVEMENTS,
  ROUND_SCORES,
  ROUND_DESIRED_RESULT,
  MOVEMENT_RESPONSE,
} = require('./constants');

async function main(readableStream) {
  const content = await stream2str(readableStream);

  return content
    .split('\n')
    .map((line) => line.split(' '))
    .map(([opponent, desiredResult]) => {
      return (
        MOVEMENT_SCORE[
          MOVEMENT_RESPONSE[ROUND_DESIRED_RESULT[desiredResult]][
            OPPONENT_MOVEMENTS[opponent]
          ]
        ] + ROUND_SCORES[ROUND_DESIRED_RESULT[desiredResult]]
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
