import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/04/input.txt");

  const lines = input.split("\n").map((line) => line.split(""));

  let found = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      // M M
      //  A
      // S S
      if (
        i <= lines.length - 3 &&
        j <= lines[i].length - 3 &&
        lines[i][j] === "M" &&
        lines[i][j + 2] === "M" &&
        lines[i + 1][j + 1] === "A" &&
        lines[i + 2][j] === "S" &&
        lines[i + 2][j + 2] === "S"
      ) {
        found += 1;
      }

      // S S
      //  A
      // M M
      if (
        i <= lines.length - 3 &&
        j <= lines[i].length - 3 &&
        lines[i][j] === "S" &&
        lines[i][j + 2] === "S" &&
        lines[i + 1][j + 1] === "A" &&
        lines[i + 2][j] === "M" &&
        lines[i + 2][j + 2] === "M"
      ) {
        found += 1;
      }

      // M S
      //  A
      // M S
      if (
        i <= lines.length - 3 &&
        j <= lines[i].length - 3 &&
        lines[i][j] === "M" &&
        lines[i][j + 2] === "S" &&
        lines[i + 1][j + 1] === "A" &&
        lines[i + 2][j] === "M" &&
        lines[i + 2][j + 2] === "S"
      ) {
        found += 1;
      }

      // S M
      //  A
      // S M
      if (
        i <= lines.length - 3 &&
        j <= lines[i].length - 3 &&
        lines[i][j] === "S" &&
        lines[i][j + 2] === "M" &&
        lines[i + 1][j + 1] === "A" &&
        lines[i + 2][j] === "S" &&
        lines[i + 2][j + 2] === "M"
      ) {
        found += 1;
      }
    }
  }

  console.log(found); // 1925
}
