import { readFileSync } from "fs";

function matchPolymers(first: string, second: string) {
  return Math.abs(first.charCodeAt(0) - second.charCodeAt(0)) === 32;
}

function parsePolymers(input: string) {
  let previousPolymer = input[0]
  const length = input.length;
  for (let index = 1; index < length; index) {
    const currentPolymer = input[index];

    if (!currentPolymer) {
      return input;
    }

    if (!matchPolymers(previousPolymer, currentPolymer)) {
      previousPolymer = currentPolymer;
      index++;
      continue;
    }

    input = `${input.slice(0, index - 1)}${input.slice(index + 1)}`;
    index--;

    if (index >= 1) {
      previousPolymer = input[index - 1];
      continue;
    }

    index = 1;
    previousPolymer = input[0];
  }

  return input;
}

function removeFromString(char: string, string: string): string {
  return `${string}`.replace(new RegExp(char, 'gi'), '');
}

function testRemovePolymers(input: string) {
  let min = Number.MAX_SAFE_INTEGER;
  const array = "abcdefghijklmnopqrstuvwxyz".split('');

  for (let index = 0; index < array.length; index++) {
    const simplifiedString = removeFromString(array[index], input);
    const count = parsePolymers(simplifiedString).length
    min = min > count
      ? count
      : min;
  }

  return min;
}

export async function start(src: string) {
  const input = readFileSync(src).toString()

  const start = +new Date()
  const output = testRemovePolymers(input);
  const end = +new Date();
  var diff = end - start;

  console.log("TIME:", diff);
  console.log("RESULT:", output);

  return output;
}
