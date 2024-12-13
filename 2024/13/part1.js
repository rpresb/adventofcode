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
      P: getButtonConfig(input[i]),
    });
  }

  console.log(minTokensToWin(prizes));
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function minTokensToWin(prizes) {
  let results = [];
  for (let prize of prizes) {
    let [ax, ay] = prize.A;
    let [bx, by] = prize.B;
    let [px, py] = prize.P;

    let found = false;
    let minTokens = Infinity;

    for (let aPresses = 0; aPresses <= 100; aPresses++) {
      for (let bPresses = 0; bPresses <= 100; bPresses++) {
        if (
          aPresses * ax + bPresses * bx === px &&
          aPresses * ay + bPresses * by === py
        ) {
          let tokens = aPresses * 3 + bPresses;
          if (tokens < minTokens) {
            minTokens = tokens;
            found = true;
          }
        }
      }
    }

    if (found) {
      results.push(minTokens);
    }
  }

  return results.reduce((a, b) => a + b, 0);
}
