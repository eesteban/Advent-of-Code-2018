import { parseLine, start } from './index';

describe('Advent of code - Day 10 - Part 1', async () => {
  test('Test parse line', async () => {
    const result = parseLine('position=<-3,  6> velocity=< 2, -1>');
    expect(result).toEqual({
      position: {
        x: -3,
        y: 6
      },
      velocity: {
        x: 2,
        y: -1
      }
    });
  });

  // test('Test input', async () => {
  //   await start('./src/10/inputs/input-test.txt');
  // });

  test('My input', async () => {
    await start('./src/10/inputs/input.txt');
  });
});
