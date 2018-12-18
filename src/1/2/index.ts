import { createReadStream, ReadStream } from "fs";
import { createInterface } from 'readline';

async function parseFrequencies(input: ReadStream): Promise<number[]> {
  var lineReader = createInterface({ input });
  const frequencies: number[] = []

  return new Promise<number[]>((res) => {
    lineReader.on('line', (line) => frequencies.push(Number.parseInt(line)))
      .on('close', () => res(frequencies));
  });
}

function getFirstRepeatedFrequency(input: number[]): number {
  const frequencies = [0];
  let index = 0;
  let result;
  while (!result) {
    const frequency = frequencies[frequencies.length - 1] + input[index];
    if (frequencies.includes(frequency)) {
      result = frequency;
    } else {
      frequencies.push(frequency);
    }

    index++

    if (index >= input.length) {
      index = 0
    }
  }

  return result;
}

export async function start(src: string) {
  const input = createReadStream(src);
  const start = +new Date();
  const array = await parseFrequencies(input);
  const output = getFirstRepeatedFrequency(array);
  const end = +new Date();
  var diff = end - start;

  console.log("TIME:", diff);
  console.log("RESULT:", output);

  return output;
}
