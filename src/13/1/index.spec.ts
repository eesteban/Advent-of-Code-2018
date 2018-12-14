import {
  start,
} from './index';

describe('Advent of code - Day 13 - Part 1', async () => {
  test('Test input', async () => {
    const result = await start('./src/13/inputs/test-input.txt');
    expect(result).toEqual([7, 3]);
  });

  test('My input', async () => {
    const result = await start('./src/13/inputs/input.txt');
    expect(result).toEqual([83, 49]);
  });
});
