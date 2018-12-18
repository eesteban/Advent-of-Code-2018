import { start } from './index';

describe('Advent of code - Day 1 - Part 2', async () => {
  test('Test', async () => {
    const result = await start('./src/1/inputs/input-test-2.txt');
    expect(result).toEqual(14);
  });

  test('Input', async () => {
    const result = await start('./src/1/inputs/input.txt');
    expect(result).toEqual(78724);
  });
});
