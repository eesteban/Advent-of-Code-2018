import { ReadStream, createReadStream } from 'fs';
import { createInterface } from 'readline';

type TState = {
  [key: number]: string
}

type TNotes = {
  [key: string]: string
}

interface IPuzzle {
  states: IPotCount[];
  notes: TNotes;
}

interface IPotCount {
  state: TState;
  printState: string;
  relevantState: string;
  count: number;
}

function parseInitialStateLine(input: string): string {
  return input.replace('initial state: ', '');
}

function parseSpreadNoteLine(input: string): string[] {
  const [note, result] = input.split(' => ');
  return [note, result]
}

async function parseInput(input: ReadStream): Promise<IPuzzle> {
  var lineReader = createInterface({ input });

  const puzzle: IPuzzle = {
    states: [],
    notes: {},
  }

  return new Promise<IPuzzle>((res) => {
    lineReader.on('line', (line) => {
      switch (line[0]) {
        case 'i':
          const relevantState = parseInitialStateLine(line)
          puzzle.states.push({
            state: relevantState
              .split('')
              .reduce((r: TState, s, i) => {
                r[i] = s;
                return r;
              }, {}),
            printState: relevantState,
            relevantState,
            count: 0,
          })
          break;
        case '.':
        case '#':
          const [note, result] = parseSpreadNoteLine(line)
          puzzle.notes[note] = result;
          break;
        default:
          break;
      }
    })
      .on('close', () => res(puzzle));
  });
}

export function parseGeneration(initialState: TState, notes: TNotes): TState {
  const nextState: TState = {};
  const [lowestIndex, highestIndex] = getIndexes(initialState);

  for (let index = lowestIndex; index <= highestIndex; index++) {
    nextState[index] = parseIndex(initialState, index, notes);
  }

  return nextState;
}

function parseIndex(previousState: TState, index: number, notes: TNotes) {
  const key = [
    previousState[index - 2] || '.',
    previousState[index - 1] || '.',
    previousState[index] || '.',
    previousState[index + 1] || '.',
    previousState[index + 2] || '.',
  ].join('');

  return notes[key] || '.';
}

function getPotCount(initialState: TState, notes: TNotes) {
  const state = parseGeneration(initialState, notes);

  const count = Object.keys(state)
    .map((k) => {
      const index = Number.parseInt(k);
      return state[index] === '#' ? index : 0;
    })
    .filter(Boolean)
    .reduce((r, k) => r += k, 0)

  const [lowestIndex, highestIndex] = getIndexes(state);
  const ps = printState(lowestIndex, highestIndex, state);
  return { state, count, printState: ps, relevantState: ps.slice(ps.indexOf('#'), ps.length) };
}

function getIndexes(lastState: TState) {
  const indexes = Object.keys(lastState).map((i) => Number.parseInt(i)).sort((a, b) => a - b);
  let lowestIndex = indexes[0];
  if (lastState[lowestIndex] === '#') {
    lowestIndex--;
  }
  if (lastState[lowestIndex] === '#') {
    lowestIndex--;
  }
  let highestIndex = indexes[indexes.length - 1];
  if (lastState[highestIndex] === '#') {
    highestIndex++;
  }
  if (lastState[highestIndex] === '#') {
    highestIndex++;
  }
  return [lowestIndex, highestIndex];
}

function printState(lowestIndex: number, highestIndex: number, state: TState): string {
  let string = '';
  for (let index = lowestIndex; index <= highestIndex; index++) {
    string = string.concat(state[index] || '.');
  }
  return string;
}

export async function start(path: string) {
  const input = createReadStream(path);
  const { states, notes } = await parseInput(input)

  const start = +new Date();

  let loopGenerations: boolean = false;
  const totalGenerations: number = 50000000000;
  let generation = 1;

  while (!loopGenerations) {
    const next = getPotCount(states[states.length - 1].state, notes)
    loopGenerations = !!states.find(({ relevantState }) => relevantState === next.relevantState);
    states.push(next);

    if (!loopGenerations) {
      generation++;
    }
  }

  const previousCount = states[generation - 1].count
  const nextCount = states[generation].count

  const output = ((totalGenerations - generation) * (nextCount - previousCount)) + nextCount;

  const end = +new Date();
  var diff = end - start;

  console.log("TIME:", diff);
  console.log("RESULT:", output);

  return output;
}
