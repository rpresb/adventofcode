import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/06/input.txt");

  const lines = input.split("\n").map((line) => line.split(""));

  let currentPos = lines.reduce(
    (acc, line, idx) => {
      if (line.includes("^")) {
        return [idx, line.indexOf("^")];
      }

      return acc;
    },
    [0, 0]
  );

  let result = [lines, currentPos, []];
  do {
    result = walk(...result);
  } while (Array.isArray(result));

  console.log(result + 1);
}

function walk(matrix, currentPos, path = []) {
  const [line, col] = currentPos;

  switch (matrix[line][col]) {
    case "^":
      if (isOut(matrix, [line - 1, col])) {
        return path.length;
      } else if (isBlocked(matrix[line - 1][col])) {
        matrix[line][col] = ">";
        return [matrix, currentPos, path];
      } else {
        matrix[line - 1][col] = matrix[line][col];
        matrix[line][col] = ".";
        return [matrix, [line - 1, col], addUnique(path, line, col)];
      }
    case ">":
      if (isOut(matrix, [line, col + 1])) {
        return path.length;
      } else if (isBlocked(matrix[line][col + 1])) {
        matrix[line][col] = "v";
        return [matrix, currentPos, path];
      } else {
        matrix[line][col + 1] = matrix[line][col];
        matrix[line][col] = ".";
        return [matrix, [line, col + 1], addUnique(path, line, col)];
      }
    case "v":
      if (isOut(matrix, [line + 1, col])) {
        return path.length;
      } else if (isBlocked(matrix[line + 1][col])) {
        matrix[line][col] = "<";
        return [matrix, currentPos, path];
      } else {
        matrix[line + 1][col] = matrix[line][col];
        matrix[line][col] = ".";
        return [matrix, [line + 1, col], addUnique(path, line, col)];
      }
    case "<":
      if (isOut(matrix, [line, col - 1])) {
        return path.length;
      } else if (isBlocked(matrix[line][col - 1])) {
        matrix[line][col] = "^";
        return [matrix, currentPos, path];
      } else {
        matrix[line][col - 1] = matrix[line][col];
        matrix[line][col] = ".";
        return [matrix, [line, col - 1], addUnique(path, line, col)];
      }
  }
}

function isBlocked(char) {
  return char === "#";
}

function isOut(matrix, currentPos) {
  return matrix[currentPos[0]]?.[currentPos[1]] === undefined;
}

function addUnique(path, line, col) {
  return Array.from(new Set([...path, `${line},${col}`]));
}
