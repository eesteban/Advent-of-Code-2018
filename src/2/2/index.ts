import { createReadStream, ReadStream } from "fs";
import { createInterface } from 'readline';

async function parseFrequencies(input: ReadStream) {
  var lineReader = createInterface({ input });
  let ids: string[] = [];

  return new Promise<string[]>((res) => {
    lineReader.on('line', (line) => ids.push(line))
      .on('close', () => res(ids));
  });
}

export function stringMatch(a: string[], b: string[]): string | undefined {
  const result: string[] = [];

  for (let index = 0; index < a.length; index++) {
    const aC = a[index];
    const bC = b[index];

    if (aC === bC) {
      result.push(aC)
    } else {
      if (result.length < index) {
        return;
      }
    }
  }

  return result.join('');
}

function getMatch(input: string[]): string {
  let result: string | undefined;
  const ids = input.map((i) => i.split(''));
  while (!result) {
    const [currentS] = ids
    for (let index = 1; index < ids.length && !result; index++) {
      const result = stringMatch(currentS, ids[index]);

      if (result) {
        return result;
      }
    }

    ids.splice(0, 1)
  }
  return result;

}

export async function start(src: string) {
  const input = createReadStream(src);
  const start = +new Date();
  const ids = await parseFrequencies(input);
  const output = getMatch(ids);
  const end = +new Date();
  var diff = end - start;

  console.log("TIME:", diff);
  console.log("RESULT:", output);

  return output;
}
