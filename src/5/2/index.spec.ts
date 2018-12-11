import { start } from './index';

describe('Advent of code - Day 5 - Part 2', async () => {
  test('Test', async () => {
    const result = await start('./src/inputs/input-test.txt');
    expect(result).toEqual(4);
  });

  test('Input', async () => {
    const result = await start('./src/inputs/input.txt');
    expect(result).toEqual(17);
  });
});
