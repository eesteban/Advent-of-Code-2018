import { ReadStream, createReadStream } from 'fs';
import { createInterface } from 'readline';

type TPath = [number, number, string];
type TTruck = [number, number, string, TModifier];

type IPuzzle = {
  path: Array<TPath>
  trucks: Array<TTruck>
}

interface ISpecificInterseaction {
  [key: string]: string | ((left: TModifier) => string)
}
interface IIntersection {
  [key: string]: ISpecificInterseaction
}

const intersection: IIntersection = {};
const intersection1: ISpecificInterseaction = {
  "-": ">",
  "\\": "v",
  "/": "^",
  "+": (mod: TModifier) => {
    switch (mod) {
      case -1:
        return '^'
      case 0:
        return ">"
      case 1:
        return "v"
    }
  },
};
intersection[">"] = intersection1;
const intersection2: ISpecificInterseaction = {
  "-": "<",
  "\\": "^",
  "/": "v",
  "+": (mod: TModifier) => {
    switch (mod) {
      case -1:
        return 'v'
      case 0:
        return "<"
      case 1:
        return "^"
    }
  },
};
intersection["<"] = intersection2;
const intersection3: ISpecificInterseaction = {
  "|": "^",
  '\\': "<",
  "/": ">",
  "+": (mod: TModifier) => {
    switch (mod) {
      case -1:
        return '<'
      case 0:
        return "^"
      case 1:
        return ">"
    }
  },
};
intersection["^"] = intersection3;
const intersection4: ISpecificInterseaction = {
  "|": "v",
  "\\": ">",
  "/": "<",
  "+": (mod: TModifier) => {
    switch (mod) {
      case -1:
        return '>'
      case 0:
        return "v"
      case 1:
        return "<"
    }
  },
};
intersection["v"] = intersection4;

function isTruck(input: string): boolean {
  return input === ">"
    || input === "<"
    || input === "v"
    || input === "^";
}

function truckToPath(input: string): string {
  if (input === ">"
    || input === "<") {
    return "-"
  }
  return "|"
}

type TModifier = 1 | -1 | 0;

function truckToModifier(input: string): [TModifier, TModifier] {
  if (input === ">") {
    return [1, 0]
  }
  if (input === "<") {
    return [-1, 0]
  }
  if (input === "^") {
    return [0, -1]
  }
  return [0, 1]
}

function isPath(input: string): boolean {
  return input === "-"
    || input === "|"
    || input === "+"
    || input === "/"
    || input === "\\";
}

async function parseInput(input: ReadStream): Promise<IPuzzle> {
  var lineReader = createInterface({ input });

  const puzzle: IPuzzle = {
    path: [],
    trucks: [],
  }

  return new Promise<IPuzzle>((res) => {
    let y = 0;
    lineReader.on('line', (line) => {
      line.split('')
        .forEach((c, x) => {
          if (isPath(c)) {
            puzzle.path.push([x, y, c])
            return;
          }

          if (isTruck(c)) {
            puzzle.trucks.push([x, y, c, -1])
            puzzle.path.push([x, y, truckToPath(c)])
            return;
          }
        })
      y++;
    })
      .on('close', () => res(puzzle));
  });
}

function getNextDirection([x, y, d, r]: TTruck, path: Array<TPath>): [string, TModifier] {
  const p = path.find(([xP, yP]) => x === xP && y === yP);

  if (!p) {
    throw new Error("Can't get next direction")
  }

  const [, , dP] = p;
  const nD = intersection[d][dP];
  if (typeof nD === 'function') {
    return [nD(r), r === -1 ? 0 : r === 0 ? 1 : -1];
  }

  return [nD, r];
}

function nextStep({ path, trucks }: IPuzzle) {
  for (let index = 0; index < trucks.length; index++) {
    let [x, y, d, r] = trucks[index];

    const [xM, yM] = truckToModifier(d);
    x = x + xM;
    y = y + yM;

    let matchingTruckIndex = trucks.findIndex(([xT, yT]) => x === xT && y === yT)
    if (matchingTruckIndex === -1) {
      const [dM, nR] = getNextDirection([x, y, d, r], path);
      trucks[index] = [x, y, dM, nR];
      continue;
    }

    trucks.splice(index, 1)

    if (matchingTruckIndex > index) {
      matchingTruckIndex--;
    } else if (matchingTruckIndex < index) {
      index--;
    }

    index--;

    trucks.splice(matchingTruckIndex, 1)
    if (index < 0) {
      index = 0;
    }
  }

  trucks.sort(([xA, yA], [xB, yB]) => {
    const x = xA - xB;
    if (x !== 0) {
      return x;
    }
    return yA - yB;
  })
}

function printTrucks(trucks: TTruck[], path: TPath[], [maxX, maxY]: [number, number]) {
  let print = '';
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const t = trucks.find(([xT, yT]) => x === xT && y === yT)
      if (t) {
        print += t[2];
      } else {
        const t = path.find(([xT, yT]) => x === xT && y === yT)
        if (t) {
          print += t[2];
        }
        else {
          print += ' ';
        }
      }
    }
    print += '\n'
  }
  console.log(print);
  return print;
}

export async function start(path: string): Promise<number[]> {
  const input = createReadStream(path);
  const puzzle = await parseInput(input)
  const start = +new Date();

  const maxX = puzzle.path.reduce((m, [x]) => m < x ? x : m, 0);
  const maxY = puzzle.path.reduce((m, [, y]) => m < y ? y : m, 0);
  const pathSize: [number, number] = [maxX, maxY];

  while (puzzle.trucks.length > 1) {
    nextStep(puzzle)
  }

  nextStep(puzzle)
  printTrucks(puzzle.trucks, puzzle.path, pathSize)

  const [x, y] = puzzle.trucks[0];
  const output = [x, y];

  const end = +new Date();
  var diff = end - start;

  console.log("TIME:", diff);
  console.log("RESULT:", output);

  return output;
}
