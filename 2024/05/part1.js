import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/05/input.txt");

  const lines = input.split("\n");

  const idx = lines.findIndex((line) => line.length === 0);

  const rules = lines.slice(0, idx);
  const updates = lines.slice(idx + 1);

  const rulesMap = rules.reduce((acc, rule) => {
    const [x, y] = rule.split("|").map(Number);

    acc[x] = {
      before: [...(acc[x]?.before ?? [])],
      after: [...(acc[x]?.after ?? []), y],
    };

    acc[y] = {
      before: [...(acc[y]?.before ?? []), x],
      after: [...(acc[y]?.after ?? [])],
    };

    return acc;
  }, {});

  const sumMiddle = updates.reduce((acc, update) => {
    const arr = update.split(",").map(Number);

    let isValid = true;
    for (let i = 0; i < arr.length - 1; i++) {
      const curr = arr[i];

      if (rulesMap[curr]) {
        for (let j = i + 1; j < arr.length; j++) {
          const next = arr[j];

          if (
            !rulesMap[curr].after.includes(next) ||
            !rulesMap[next].before.includes(curr)
          ) {
            isValid = false;
            break;
          }
        }
      }

      if (!isValid) {
        break;
      }
    }

    if (isValid) {
      const mid = Math.floor(arr.length / 2);
      return acc + Number(arr.slice(mid, mid + 1));
    }

    return acc;
  }, 0);

  console.log(sumMiddle);
}
