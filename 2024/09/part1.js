import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/09/input.txt");

  const blocks = [];

  for (let i = 0; i < input.length; i++) {
    blocks.push(
      ...Array.from({ length: +input[i] }, () =>
        i % 2 === 0 ? (i / 2).toString() : "."
      )
    );
  }

  while (blocks.includes(".")) {
    const idx = blocks.findIndex((block) => block === ".");
    const [lastChar] = blocks.splice(-1, 1);
    blocks[idx] = lastChar;
  }

  let sum = 0;
  for (let i = 0; i < blocks.length; i++) {
    sum += i * +blocks[i];
  }

  console.log(sum);
}
