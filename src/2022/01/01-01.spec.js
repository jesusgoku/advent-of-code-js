const { describe, it, expect } = require('@jest/globals');
const fs = require('node:fs');
const path = require('node:path');
const { elfMaxCaloriesInMemory, elfMaxCaloriesStream } = require('./01-01');

describe('Module: 2022/01-01', () => {
  describe('Function: elfMaxCaloriesInMemory', () => {
    it('should solve presentation problem', async () => {
      await expect(
        elfMaxCaloriesInMemory(
          fs.createReadStream(path.join(__dirname, 'inputs/presentation.txt')),
        ),
      ).resolves.toBe(24_000);
    });

    it('should solve main problem', async () => {
      await expect(
        elfMaxCaloriesInMemory(
          fs.createReadStream(path.join(__dirname, 'inputs/problem.txt')),
        ),
      ).resolves.toBe(73_211);
    });
  });

  describe('Function: elfMaxCaloriesStream', () => {
    it('should solve presentation problem', async () => {
      await expect(
        elfMaxCaloriesStream(
          fs.createReadStream(path.join(__dirname, 'inputs/presentation.txt')),
        ),
      ).resolves.toBe(24_000);
    });

    it('should solve main problem', async () => {
      await expect(
        elfMaxCaloriesStream(
          fs.createReadStream(path.join(__dirname, 'inputs/problem.txt')),
        ),
      ).resolves.toBe(73_211);
    });
  });
});
