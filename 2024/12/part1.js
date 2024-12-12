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
    let area = 0;
    let perimeter = 0;

    while (stack.length > 0) {
      const [cx, cy] = stack.pop();
      if (visited[cx][cy]) continue;
      visited[cx][cy] = true;
      area++;

      let localPerimeter = 4;
      for (const [dx, dy] of directions) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx >= 0 && ny >= 0 && nx < rows && ny < cols) {
          if (matrix[nx][ny] === value) {
            stack.push([nx, ny]);
            localPerimeter--;
          }
        }
      }
      perimeter += localPerimeter;
    }

    return { area, perimeter };
  }

  let totalPrice = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!visited[i][j]) {
        const { area, perimeter } = dfs(i, j, matrix[i][j]);
        totalPrice += area * perimeter;
      }
    }
  }

  return totalPrice;
}
