import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2021/01/input.txt");

  const lines = input.split("\n").map(Number);

  const windows = [];
  for (let i = 2; i < lines.length; i++) {
    const sumPrevious = lines[i - 1] + lines[i - 2] + lines[i];
    windows.push(sumPrevious);
  }

  console.log(
    windows.reduce((acc, line) => {
      return {
        increased: (acc.increased ?? 0) + (acc?.prev < line ? 1 : 0),
        decreased: (acc.decreased ?? 0) + (acc?.prev > line ? 1 : 0),
        prev: line,
      };
    }, {})
  );
}
