import { createReadStream, ReadStream } from "fs";
import { createInterface } from 'readline';

interface ILetterCount {
  two: number;
  three: number;
}

async function parseFrequencies(input: ReadStream) {
  var lineReader = createInterface({ input });
  let ids: string[] = [];

  return new Promise<string[]>((res) => {
    lineReader.on('line', (line) => ids.push(line))
      .on('close', () => res(ids));
  });
}

function letterCount(id: string): ILetterCount {
  let letters: { [key: string]: number } = {};

  id.split('').forEach((l) => {
    if (letters[l]) {
      letters[l] += 1;
    } else {
      letters[l] = 1;
    }
  })

  const letterCount: ILetterCount = {
    two: Object.keys(letters).filter((l) => letters[l] === 2).length ? 1 : 0,
    three: Object.keys(letters).filter((l) => letters[l] === 3).length ? 1 : 0,
  }

  return letterCount;
}

function checksum(input: string[]) {
  const sum = input
    .map((id) => letterCount(id))
    .reduce((r, { two, three }) => {
      r.two += two;
      r.three += three;
      return r;
    }, { two: 0, three: 0 })

  return sum.two * sum.three;
}

export async function start(src: string) {
  const input = createReadStream(src);
  const start = +new Date();
  const ids = await parseFrequencies(input);
  const output = checksum(ids);
  const end = +new Date();
  var diff = end - start;

  console.log("TIME:", diff);
  console.log("RESULT:", output);

  return output;
}
