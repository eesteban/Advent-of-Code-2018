import { readFileSync } from "fs";

function isPolar(character: string) {
  return character === character.toUpperCase()
}

function matchPolymers(first: string, second: string) {
  const firstPolarity = isPolar(first)
  const secondPolarity = isPolar(second)

  return first.toLowerCase() === second.toLowerCase()
    ? firstPolarity !== secondPolarity
    : false;
}

function parsePolymers(input: string) {
  let previousPolymer = input[0]
  for (let index = 1; index < input.length; index) {
    const currentPolymer = input[index];
    if (!currentPolymer) {
      return input;
    }

    if (matchPolymers(previousPolymer, currentPolymer)) {
      input = `${input.slice(0, index - 1)}${input.slice(index + 1)}`;
      index--;

      if (index < 1) {
        index = 1
        previousPolymer = input[0]
      } else {
        previousPolymer = input[index - 1 || 0]
      }
    } else {
      previousPolymer = currentPolymer;
      index++;
    }
  }

  return input;
}

const input = readFileSync('./input.txt').toString()
const start = +new Date()
const output = parsePolymers(input);
const end = +new Date();
var diff = end - start;

console.log("TIME:", diff);
console.log("RESULT:", output);
