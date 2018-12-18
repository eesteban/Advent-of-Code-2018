import {
  start,
  stringMatch,
} from './index';

describe('Advent of code - Day 2 - Part 2', async () => {
  test('Test matches', async () => {
    const result = stringMatch('fghij'.split(''), 'fguij'.split(''));
    expect(result).toEqual('fgij');
    const result2 = stringMatch('abcde'.split(''), 'axcye'.split(''));
    expect(result2).toBeUndefined();
  });

  test('Test', async () => {
    const result = await start('./src/2/inputs/input-test-2.txt');
    expect(result).toEqual('fgij');
  });

  test('Input', async () => {
    const result = await start('./src/2/inputs/input.txt');
    expect(result).toEqual('pebjqsalrdnckzfihvtxysomg');
  });
});
