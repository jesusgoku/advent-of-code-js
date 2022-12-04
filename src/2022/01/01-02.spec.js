const { describe, it, expect } = require('@jest/globals');
const fs = require('node:fs');
const path = require('node:path');
const {
  elfTopThreeMaxCaloriesInMemory,
  elfTopThreeMaxCaloriesStream,
} = require('./01-02');

describe('Module: 2022/01-02', () => {
  describe('Function: elfTopThreeMaxCaloriesInMemory', () => {
    it('should solve presentation problem', async () => {
      await expect(
        elfTopThreeMaxCaloriesInMemory(
          fs.createReadStream(path.join(__dirname, 'inputs/presentation.txt')),
        ),
      ).resolves.toBe(45_000);
    });

    it('should solve main problem', async () => {
      await expect(
        elfTopThreeMaxCaloriesInMemory(
          fs.createReadStream(path.join(__dirname, 'inputs/problem.txt')),
        ),
      ).resolves.toBe(213_958);
    });
  });

  describe('Function: elfTopThreeMaxCaloriesStream', () => {
    it('should solve presentation problem', async () => {
      await expect(
        elfTopThreeMaxCaloriesStream(
          fs.createReadStream(path.join(__dirname, 'inputs/presentation.txt')),
        ),
      ).resolves.toBe(45_000);
    });

    it('should solve main problem', async () => {
      await expect(
        elfTopThreeMaxCaloriesStream(
          fs.createReadStream(path.join(__dirname, 'inputs/problem.txt')),
        ),
      ).resolves.toBe(213_958);
    });
  });
});
