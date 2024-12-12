import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/12/input.txt");

  const lines = input.split("\n").map((line) => line.split(""));

  console.log(calculateTotalPrice(lines));
}

function calculateTotalPrice(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  function dfs(x, y, value) {
    const stack = [[x, y]];
    let currentArea = Array.from({ length: rows }, () =>
      Array(cols).fill(false)
    );

    while (stack.length > 0) {
      const [cx, cy] = stack.pop();
      if (visited[cx][cy]) continue;
      visited[cx][cy] = true;
      currentArea[cx][cy] = true;

      for (const [dx, dy] of directions) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx >= 0 && ny >= 0 && nx < rows && ny < cols) {
          if (matrix[nx][ny] === value) {
            stack.push([nx, ny]);
          }
        }
      }
    }

    // horizontal sides
    let horizontalSides = 0;
    for (let i = 0; i < currentArea.length; i++) {
      let foundPrev = false;
      let foundNext = false;

      for (let j = 0; j < currentArea[i].length; j++) {
        const prevLine = i > 0 ? currentArea[i - 1][j] : false;
        const nextLine =
          i < currentArea.length - 1 ? currentArea[i + 1][j] : false;

        if (currentArea[i][j] && !foundPrev && !prevLine) {
          foundPrev = true;

          horizontalSides++;
        }

        if (currentArea[i][j] && !foundNext && !nextLine) {
          foundNext = true;

          horizontalSides++;
        }

        if (foundNext && nextLine) foundNext = false;
        if (foundPrev && prevLine) foundPrev = false;

        if (!currentArea[i][j]) {
          foundPrev = false;
          foundNext = false;
        }
      }
    }

    // vertical sides
    let verticalSides = 0;
    for (let i = 0; i < currentArea[0].length; i++) {
      let foundPrev = false;
      let foundNext = false;

      for (let j = 0; j < currentArea.length; j++) {
        const prevCol = i > 0 ? currentArea[j][i - 1] : false;
        const nextCol =
          i < currentArea[0].length - 1 ? currentArea[j][i + 1] : false;

        if (currentArea[j][i] && !foundPrev && !prevCol) {
          foundPrev = true;

          verticalSides++;
        }

        if (currentArea[j][i] && !foundNext && !nextCol) {
          foundNext = true;

          verticalSides++;
        }

        if (foundNext && nextCol) foundNext = false;
        if (foundPrev && prevCol) foundPrev = false;

        if (!currentArea[j][i]) {
          foundPrev = false;
          foundNext = false;
        }
      }
    }

    return {
      area: currentArea.flat().filter(Boolean).length,
      sides: horizontalSides + verticalSides,
    };
  }

  let totalPrice = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!visited[i][j]) {
        const { area, sides } = dfs(i, j, matrix[i][j]);
        totalPrice += area * sides;
      }
    }
  }

  return totalPrice;
}
