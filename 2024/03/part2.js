import { readInput } from "../../helper.js";

export default function exec() {
  let input = readInput("2024/03/input.txt");

  // Remove all "don't" instructions until it finds a "do" instruction
  while (/(don't\(\))/gm.exec(input)) {
    const dontIdx = /(don't\(\))/gm.exec(input).index;
    const doIdx = dontIdx + /(do\(\))/gm.exec(input.substring(dontIdx)).index;
    input = input.substring(0, dontIdx) + input.substring(doIdx);
  }

  const matches = input.match(/(mul\(\d+,\d+\))/gm);
  const res = matches.reduce((acc, curr) => {
    const [a, b] = curr.match(/(\d+)/g).map(Number);

    return acc + a * b;
  }, 0);

  console.log(res); // 87163705
}
