import { createReadStream, ReadStream } from "fs";
import { createInterface } from 'readline';

type TRegisters = [number, number, number, number, number, number]
export type TInstruction = [string, number, number, number]
interface IPuzzle {
  ipIndex: number;
  ip: number;
  registers: TRegisters;
  instructions: TInstruction[];
}

async function parsePuzzle(input: ReadStream) {
  var lineReader = createInterface({ input });
  let ipIndex: number = 0;
  let instructions: TInstruction[] = [];

  return new Promise<IPuzzle>((res) => {
    lineReader.on('line', (line) => {
      if (line.charAt(0) === '#') {
        const [, s] = line.split('#ip ')
        ipIndex = Number.parseInt(s);
      } else {
        const [instr, a, b, c] = line.split(' ')
        instructions.push([instr, Number.parseInt(a), Number.parseInt(b), Number.parseInt(c)])
      }
    })
      .on('close', () => res({ ipIndex: ipIndex, ip: 0, instructions, registers: [0, 0, 0, 0, 0, 0] }));
  });
}

export function execute({ ipIndex, ip, registers, instructions }: IPuzzle) {
  registers[ipIndex] = ip;
  const [instruction, a, b, c] = instructions[ip];

  switch (instruction) {
    case 'addr':
      registers[c] = registers[a] + registers[b];
      break;

    case 'addi':
      registers[c] = registers[a] + b;
      break;

    case 'mulr':
      registers[c] = registers[a] * registers[b];
      break;

    case 'muli':
      registers[c] = registers[a] * b;
      break;
    case 'banr':
      registers[c] = registers[a] & registers[b];
      break;

    case 'bani':
      registers[c] = registers[a] & b;
      break;

    case 'borr':
      registers[c] = registers[a] | registers[b];
      break;

    case 'bori':
      registers[c] = registers[a] | b;
      break;

    case 'setr':
      registers[c] = registers[a];
      break;

    case 'seti':
      registers[c] = a;
      break;

    case 'gtir':
      registers[c] = a > registers[b] ? 1 : 0;
      break;

    case 'gtri':
      registers[c] = registers[b] > a ? 1 : 0;
      break;

    case 'gtrr':
      registers[c] = registers[a] > registers[b] ? 1 : 0;
      break;

    case 'eqir':
      registers[c] = a === registers[b] ? 1 : 0;
      break;

    case 'eqri':
      registers[c] = registers[b] === a ? 1 : 0;
      break;

    case 'eqrr':
      registers[c] = registers[a] === registers[b] ? 1 : 0;
      break;

    default:
      throw new Error('Unknown instruction')
  }

  return {
    ipIndex,
    registers,
    ip: registers[ipIndex] + 1,
    instructions,
  }
}

function run(puzzle: IPuzzle) {
  while (true) {
    puzzle = execute(puzzle);

    if (puzzle.ip >= puzzle.instructions.length) {
      return puzzle.registers[0];
    }
  }
}

export async function start(src: string) {
  const input = createReadStream(src);
  const start = +new Date();

  const puzzle = await parsePuzzle(input);
  const output = run(puzzle);

  const end = +new Date();
  var diff = end - start;

  console.log("TIME:", diff);
  console.log("RESULT:", output);

  return output;
}
