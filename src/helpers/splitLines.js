const readline = require('node:readline');

async function* splitLines(readableStream) {
  const rl = readline.createInterface({
    input: readableStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    yield line;
  }
}

module.exports = {
  splitLines,
};
