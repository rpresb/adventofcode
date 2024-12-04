import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/04/input.txt");

  const lines = input.split("\n").map((line) => line.split(""));

  let found = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] !== "X") {
        continue;
      }

      // horizontal forwards
      if (
        j <= lines[i].length - 4 &&
        lines[i].slice(j, j + 4).join("") === "XMAS"
      ) {
        found += 1;
      }

      // horizontal backwards
      if (j - 3 >= 0 && lines[i].slice(j - 3, j + 1).join("") === "SAMX") {
        found += 1;
      }

      // vertical downwards
      if (
        i <= lines.length - 4 &&
        lines
          .slice(i, i + 4)
          .map((line) => line[j])
          .join("") === "XMAS"
      ) {
        found += 1;
      }

      // vertical upwards
      if (
        i - 3 >= 0 &&
        lines
          .slice(i - 3, i + 1)
          .map((line) => line[j])
          .join("") === "SAMX"
      ) {
        found += 1;
      }

      // diagonal forwards downwards
      if (
        i <= lines.length - 4 &&
        j <= lines[i].length - 4 &&
        [0, 1, 2, 3].every((x) => lines[i + x][j + x] === "XMAS".split("")[x])
      ) {
        found += 1;
      }

      // diagonal forwards upwards
      if (
        i - 3 >= 0 &&
        j <= lines[i].length - 4 &&
        [0, 1, 2, 3].every((x) => lines[i - x][j + x] === "XMAS".split("")[x])
      ) {
        found += 1;
      }

      // diagonal backwards downwards
      if (
        i <= lines.length - 4 &&
        j - 3 >= 0 &&
        [0, 1, 2, 3].every((x) => lines[i + x][j - x] === "XMAS".split("")[x])
      ) {
        found += 1;
      }

      // diagonal backwards upwards
      if (
        i - 3 >= 0 &&
        j - 3 >= 0 &&
        [0, 1, 2, 3].every((x) => lines[i - x][j - x] === "XMAS".split("")[x])
      ) {
        found += 1;
      }
    }
  }

  console.log(found); // 2483
}
