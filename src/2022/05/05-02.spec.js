const { describe, it, expect } = require('@jest/globals');
const fs = require('node:fs');
const path = require('node:path');
const { main } = require('./05-02');

describe('Module: 2022/05-02', () => {
  it('should solve presentation', async () => {
    await expect(
      main(
        fs.createReadStream(path.join(__dirname, 'inputs/presentation.txt')),
      ),
    ).resolves.toBe('MCD');
  });

  it('should solve problem', async () => {
    await expect(
      main(fs.createReadStream(path.join(__dirname, 'inputs/problem.txt'))),
    ).resolves.toBe('NBTVTJNFJ');
  });
});
