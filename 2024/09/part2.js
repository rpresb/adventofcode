import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/09/input.txt");

  const blocks = [];

  for (let i = 0; i < input.length; i++) {
    blocks.push(
      ...Array.from({ length: +input[i] }, () => (i % 2 === 0 ? i / 2 : "."))
    );
  }

  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] === ".") {
      continue;
    }

    let prevIdx = i - 1;
    while (blocks[prevIdx] === blocks[i] && prevIdx >= 0) {
      prevIdx--;
    }
    prevIdx++;

    let spaces = undefined;
    for (let j = 0; j < i; j++) {
      if (blocks[j] !== ".") {
        spaces = undefined;
        continue;
      }

      if (spaces === undefined) {
        spaces = j;
      }

      if (j - spaces + 1 === i - prevIdx + 1) {
        for (let k = spaces; k <= j; k++) {
          blocks[k] = blocks[i - (k - spaces)];
          blocks[i - (k - spaces)] = ".";
        }

        break;
      }
    }

    i = prevIdx;
  }
  console.log(blocks.join(""));

  let sum = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (isNaN(blocks[i])) {
      continue;
    }
    sum += i * +blocks[i];
  }

  console.log(sum);
}
