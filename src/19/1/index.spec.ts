import {
  start,
  execute,
  TInstruction,
} from './index';

describe('Advent of code - Day 19 - Part 1', async () => {
  test('Test execute', async () => {
    const instructions: TInstruction[] = [
      ['seti', 5, 0, 1],
      ['seti', 6, 0, 2],
      ['addi', 0, 1, 0],
      ['addr', 1, 2, 3],
      ['setr', 1, 0, 0],
      ['seti', 8, 0, 4],
      ['seti', 9, 0, 5],
    ]
    let result = execute({ ipIndex: 0, ip: 0, registers: [0, 0, 0, 0, 0, 0], instructions });
    expect(result).toEqual({ ipIndex: 0, ip: 1, registers: [0, 5, 0, 0, 0, 0], instructions });

    const result2 = execute({ ipIndex: 0, ip: 4, registers: [4, 5, 6, 0, 0, 0], instructions });
    expect(result2).toEqual({ ipIndex: 0, ip: 6, registers: [5, 5, 6, 0, 0, 0], instructions });
  });

  test('Test', async () => {
    const result = await start('./src/19/inputs/input-test.txt');
    expect(result).toEqual(6);
  });

  test('Input', async () => {
    const result = await start('./src/19/inputs/input.txt');
    expect(result).toEqual(1848);
  });
});
