import { start } from './index';

describe('Advent of code - Day 2 - Part 1', async () => {
  test('Test', async () => {
    const result = await start('./src/2/inputs/input-test.txt');
    expect(result).toEqual(12);
  });

  test('Input', async () => {
    const result = await start('./src/2/inputs/input.txt');
    expect(result).toEqual(0);
  });
});
