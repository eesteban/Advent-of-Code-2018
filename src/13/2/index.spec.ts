import {
  start,
} from './index';

describe('Advent of code - Day 13 - Part 2', async () => {
  test('Test input', async () => {
    const result = await start('./src/13/inputs/test-input-2.txt');
    expect(result).toEqual([6, 4]);
  });

  test('My input', async () => {
    const result = await start('./src/13/inputs/input.txt');
    expect(result).toEqual([73, 36]);
  });
});
