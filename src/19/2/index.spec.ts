import { start } from './index';

describe('Advent of code - Day 19 - Part 2', async () => {
  test('Input', async () => {
    const result = await start('./src/19/inputs/input.txt', [1, 0, 0, 0, 0, 0]);
    expect(result).toEqual(10551260);
  });
});
