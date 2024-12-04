import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/03/input.txt");

  const matches = input.match(/(mul\(\d+,\d+\))/gm);
  const res = matches.reduce((acc, curr) => {
    const [a, b] = curr.match(/(\d+)/g).map(Number);

    return acc + a * b;
  }, 0);

  console.log(res);
}
