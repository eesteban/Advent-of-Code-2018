import {
  start,
} from './index';

describe('Advent of code - Day 12 - Part 2', async () => {
  test('My input', async () => {
    const result = await start('./src/12/inputs/input.txt');
    expect(result).toEqual(3600000002022);
  });
});
