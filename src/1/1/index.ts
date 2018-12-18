import { createReadStream, ReadStream } from "fs";
import { createInterface } from 'readline';

async function parseFrequencies(input: ReadStream) {
  var lineReader = createInterface({ input });

  let frequency: number = 0;

  return new Promise((res) => {
    lineReader.on('line', (line) => {
      frequency = frequency + parseInt(line);
    })
      .on('close', () => {
        res(frequency);
      });
  });
}

export async function start(src: string) {
  const input = createReadStream(src);
  const start = +new Date();
  const output = await parseFrequencies(input);
  const end = +new Date();
  var diff = end - start;

  console.log("TIME:", diff);
  console.log("RESULT:", output);

  return output;
}
