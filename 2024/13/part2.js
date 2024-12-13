import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/13/input.txt").split("\n");

  const getButtonConfig = (text) => {
    const match = text.match(/(\d+)/gm);
    return match.map(Number);
  };

  const prizes = [];
  for (let i = 2; i < input.length; i += 4) {
    prizes.push({
      A: getButtonConfig(input[i - 2]),
      B: getButtonConfig(input[i - 1]),
      P: getButtonConfig(input[i]).map((coord) => coord + 10000000000000),
    });
  }

  console.log(
    prizes
      .map((p) =>
        minTokensToWin({
          ax: p.A[0],
          ay: p.A[1],
          bx: p.B[0],
          by: p.B[1],
          px: p.P[0],
          py: p.P[1],
        })
      )
      .reduce((a, b) => a + b, 0)
  );
}

function minTokensToWin({ ax, ay, bx, by, px, py }) {
  const a = (py * bx - px * by) / (ay * bx - ax * by);
  const b = (px - a * ax) / bx;
  if (Math.floor(a) === a && Math.floor(b) === b) return a * 3 + b;
  else return 0;
}