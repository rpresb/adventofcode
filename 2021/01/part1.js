import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2021/01/input.txt");

  const lines = input.split("\n").map(Number);

  console.log(
    lines.reduce((acc, line) => {
      return {
        increased: (acc.increased ?? 0) + (acc?.prev < line ? 1 : 0),
        decreased: (acc.decreased ?? 0) + (acc?.prev > line ? 1 : 0),
        prev: line,
      };
    }, {})
  );
}
