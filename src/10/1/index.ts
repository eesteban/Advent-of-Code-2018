import { createReadStream, ReadStream, appendFileSync } from "fs";
import { createInterface } from 'readline';

export interface ICoordinate {
  x: number;
  y: number;
};

export interface IStar {
  velocity: ICoordinate;
  position: ICoordinate;
};
export type TCanvas = ICoordinate[];

export function parseLine(input: string): IStar {
  const [firstPart, secondPart] = input.split('> velocity=<');
  const [, position] = firstPart.split('position=<')
  const velocity = secondPart.replace('>', '')
  const [pX, pY] = position.split(',')
  const [vX, vY] = velocity.split(',')
  return {
    position: {
      x: Math.trunc(Number.parseInt(pX)),
      y: Math.trunc(Number.parseInt(pY)),
    },
    velocity: {
      x: Number.parseInt(vX),
      y: Number.parseInt(vY),
    },
  }
}

async function parseInput(input: ReadStream): Promise<IStar[]> {
  var lineReader = createInterface({ input });

  const stars: IStar[] = []

  return new Promise<IStar[]>((res) => {
    lineReader.on('line', (line) => stars.push(parseLine(line)))
      .on('close', () => res(stars));
  });
}

function processCanvas(input: IStar[], second: number): TCanvas {
  return input.map(({
    position: { x: pX, y: pY },
    velocity: { x: vX, y: vY }
  }) => {
    return {
      x: pX + (vX * second),
      y: pY + (vY * second),
    }
  })
}

function generateCanvas(input: TCanvas) {
  const { minX, maxX, minY, maxY, } = input.reduce((r, { x, y }) => {
    const { minX, maxX, minY, maxY, } = r;
    if (x > maxX) {
      r.maxX = x;
    }

    if (x < minX) {
      r.minX = x;
    }

    if (y > maxY) {
      r.maxY = y;
    }

    if (y < minY) {
      r.minY = y;
    }

    return r;
  }, {
      minX: Number.MAX_SAFE_INTEGER,
      maxX: Number.MIN_SAFE_INTEGER,
      minY: Number.MAX_SAFE_INTEGER,
      maxY: Number.MIN_SAFE_INTEGER,
    });

  const canvas: string[][] = []

  const totalY = maxY - minY;
  const totalX = maxX - minX;

  for (let y = 0; y <= totalY; y++) {
    canvas[y] = []
    const currentY = y + minY;
    for (let x = 0; x <= totalX; x++) {
      const currentX = x + minX;
      canvas[y][x] = input.find(({ x: ix, y: iy }) => ix === currentX && iy === currentY)
        ? '#'
        : '.';
    }
  }

  return canvas;
}


function printCanvas(file: string, canvas: string[][]) {
  for (let index = 0; index < canvas.length; index++) {
    appendFileSync(file, `${canvas[index].join('')}\n`);
  }
}

export async function start(path: string) {
  const input = createReadStream(path);
  const parsedInput = await parseInput(input);
  let currentCanvas = processCanvas(parsedInput, 10003);
  const canvas = generateCanvas(currentCanvas);
  printCanvas(`./src/10/outputs/part-one.txt`, canvas)
}

start('./src/10/inputs/input.txt')