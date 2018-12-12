import {
  start,
} from './index';

describe('Advent of code - Day 12 - Part 1', async () => {
  test('Test input', async () => {
    const result = await start('./src/12/inputs/test-input.txt');
    expect(result).toEqual(325);
  });

  test('My input', async () => {
    const result = await start('./src/12/inputs/input.txt');
    expect(result).toEqual(3258);
  });
});
