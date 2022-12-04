#!/usr/bin/env node

const { pipeline } = require('node:stream/promises');
const { splitLines } = require('../../helpers/splitLines');
const { stream2str } = require('../../helpers/stream2str');

async function elfMaxCaloriesInMemory(readableStream) {
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
    .reduce(
      (maxCalories, elfCaloriesSum) =>
        elfCaloriesSum > maxCalories ? elfCaloriesSum : maxCalories,
      0,
    );
}

async function elfMaxCaloriesStream(readableStream) {
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
    // Select elf with most calories
    async function* (rd) {
      let maxCalories = 0;

      for await (const chunk of rd) {
        if (chunk > maxCalories) maxCalories = chunk;
      }

      yield maxCalories;
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
  elfMaxCaloriesStream(process.stdin).then((res) => {
    console.log(res);
  });
} else {
  module.exports = {
    elfMaxCaloriesInMemory,
    elfMaxCaloriesStream,
  };
}
