import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/01/input.txt");

  const lines = input.split("\n").map((line) =>
    line
      .split(" ")
      .filter((x) => x.length)
      .map(Number)
  );

  const first = lines.map((line) => line[0]).sort();
  const second = lines.map((line) => line[1]).sort();

  const sum = first
    .map((f, i) => Math.abs(f - second[i]))
    .reduce((acc, curr) => acc + curr, 0);

  console.log(sum);
}
