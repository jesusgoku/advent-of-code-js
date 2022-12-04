#!/usr/bin/env node

const { pipeline } = require('node:stream/promises');
const { splitLines } = require('../../helpers/splitLines');
const { stream2str } = require('../../helpers/stream2str');

async function elfTopThreeMaxCaloriesInMemory(readableStream) {
  const content = await stream2str(readableStream);

  return content
    .split('\n\n')
    .map((elfCalories) => elfCalories.split('\n'))
    .map((elfCalories) => elfCalories.map((calory) => parseInt(calory, 10)))
    .map((elfCalories) =>
      elfCalories.reduce(
        (elfCaloriesSum, calory) => elfCaloriesSum + calory,
        0,
      ),
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce(
      (topThreeTotalCalories, elfCaloriesSum) =>
        topThreeTotalCalories + elfCaloriesSum,
      0,
    );
}

async function elfTopThreeMaxCaloriesStream(readableStream) {
  let maxCalories = 0;

  await pipeline(
    readableStream, //
    splitLines,
    // Add elf calories
    async function* (rd) {
      let elfCalories = 0;

      for await (const chunk of rd) {
        const str = chunk.toString();
        if (str === '') {
          yield elfCalories;
          elfCalories = 0;
        } else {
          elfCalories += parseInt(str, 10);
        }
      }

      yield elfCalories;
    },
    // Select top three elf total calories
    async function* (rd) {
      let topThreeElfCalories = [];

      for await (const chunk of rd) {
        topThreeElfCalories.push(chunk);
        topThreeElfCalories.sort((a, b) => b - a);
        topThreeElfCalories = topThreeElfCalories.slice(0, 3);
      }

      yield topThreeElfCalories.reduce(
        (topThreeTotalCalories, elfCaloriesSum) =>
          topThreeTotalCalories + elfCaloriesSum,
        0,
      );
    },
    // Store in external var
    async function (rd) {
      for await (const chunk of rd) {
        maxCalories = chunk;
      }
    },
  );

  return maxCalories;
}

// istanbul ignore next
if (require.main === module) {
  elfTopThreeMaxCaloriesStream(process.stdin).then((res) => {
    console.log(res);
  });
} else {
  module.exports = {
    elfTopThreeMaxCaloriesInMemory,
    elfTopThreeMaxCaloriesStream,
  };
}
