import { start } from './index';

describe('Advent of code - Day 1 - Part 1', async () => {
  test('Test', async () => {
    const result = await start('./src/1/inputs/input-test.txt');
    expect(result).toEqual(3);
  });

  test('Input', async () => {
    const result = await start('./src/1/inputs/input.txt');
    expect(result).toEqual(553);
  });
});
