import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/01/input.txt");

  const lines = input.split("\n").map((line) =>
    line
      .split(" ")
      .filter((x) => x.length)
      .map(Number)
  );

  const first = lines.map((line) => line[0]);
  const second = lines.map((line) => line[1]);

  const result = first
    .map((f, i) => f * second.filter((s) => s === f).length)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(result);
}
