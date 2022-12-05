const { describe, it, expect } = require('@jest/globals');
const fs = require('node:fs');
const path = require('node:path');
const { main } = require('./03-02');

describe('Module: 2022/03-01', () => {
  it('should solve presentation', async () => {
    await expect(
      main(
        fs.createReadStream(path.join(__dirname, 'inputs/presentation.txt')),
      ),
    ).resolves.toBe(70);
  });

  it('should solve problem', async () => {
    await expect(
      main(fs.createReadStream(path.join(__dirname, 'inputs/problem.txt'))),
    ).resolves.toBe(2_363);
  });
});
