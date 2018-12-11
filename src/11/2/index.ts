export function calculateCellPower([x, y]: number[], serialNumber: number) {
  const rackId = x + 10;
  const basePower = rackId * y;
  let currentPower = basePower + serialNumber;
  currentPower = currentPower * rackId;
  const cpString = '' + currentPower
  const power = Number.parseInt(cpString[cpString.length - 3]);
  return power - 5;
}

function generateGrid(serialNumber: number, gridSize: number) {
  const grid: number[][] = [];
  for (let x = 0; x < gridSize; x++) {
    grid[x] = [];
    for (let y = 0; y < gridSize; y++) {
      grid[x][y] = calculateCellPower([x, y], serialNumber)
    }
  }

  return grid;
}

function calculateAreaPower(grid: number[][], [x, y]: number[], areaSize: number) {
  let power = 0;

  for (let xA = x; xA < x + areaSize; xA++) {
    for (let yA = y; yA < y + areaSize; yA++) {
      power = power + grid[xA][yA]
    }
  }

  return power;
}

function getCoordinate(grid: number[][], gridSize: number, areaSize: number) {
  let coordinate: number[] = []
  let max = Number.MIN_SAFE_INTEGER;
  const maxValid = gridSize - areaSize;
  for (let x = 0; x < maxValid; x++) {
    for (let y = 0; y < maxValid; y++) {
      const c = [x, y];
      const areaPower = calculateAreaPower(grid, c, areaSize);
      if (areaPower > max) {
        coordinate = c;
        max = areaPower;
      }
    }
  }

  return {
    coordinate,
    max,
  };
}

export function start(serialNumber: number, gridSize: number = 300) {
  const start = +new Date();
  const grid = generateGrid(serialNumber, gridSize)

  let totalMax = Number.MIN_SAFE_INTEGER;
  let output: number[] = []
  for (let areaSize = 1; areaSize <= gridSize; areaSize++) {
    const { coordinate, max } = getCoordinate(grid, gridSize, areaSize);
    if (max > totalMax) {
      totalMax = max;
      output = [...coordinate, areaSize];
    }
  }

  const end = +new Date();
  var diff = end - start;

  console.log("TIME:", diff);
  console.log("RESULT:", output);

  return output;
}
