import {
  calculateCellPower,
  start,
} from './index';

describe('Advent of code - Day 11 - Part 2', async () => {
  test('Test calculate power', async () => {
    const result = calculateCellPower([3, 5], 8);
    expect(result).toEqual(4);
  });

  // test('Test calculate power', async () => {
  //   const result = calculateCellPower([21, 61], 42);
  //   expect(result).toEqual(4);
  // });

  // test('Test calculate power', async () => {
  //   const result = calculateCellPower([122, 79], 57);
  //   expect(result).toEqual(-5);
  // });

  // test('Test calculate power', async () => {
  //   const result = calculateCellPower([217, 196], 39);
  //   expect(result).toEqual(0);
  // });

  // test('Test calculate power', async () => {
  //   const result = calculateCellPower([101, 153], 71);
  //   expect(result).toEqual(4);
  // });

  // test('Test', async () => {
  //   //Input is 18
  //   const result = start(18);
  //   expect(result).toEqual([90, 269, 16]);
  // });

  // test('Test', async () => {
  //   //Input is 18
  //   const result = start(42);
  //   expect(result).toEqual([232, 251, 12]);
  // });

  test('My input', async () => {
    //Input is 7139
    const result = start(7139);
    expect(result).toEqual([229, 61, 16]);
  });
});

