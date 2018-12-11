import { start } from './index';

describe('Advent of code - Day 5 - Part 1', async () => {
  test('Test', async () => {
    const result = await start('./src/5/inputs/input-test.txt');
    expect(result).toEqual(10);
  });

  test('Input', async () => {
    const result = await start('./src/5/inputs/input.txt');
    expect(result).toEqual(17);
  });
})
