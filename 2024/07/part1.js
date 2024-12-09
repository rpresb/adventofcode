import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/07/input.txt");

  const lines = input.split("\n").map((line) => {
    const [left, right] = line.split(":");
    const res = +left;
    const numbers = right.trim().split(" ").map(Number);

    return {
      res,
      numbers,
    };
  });

  const valid = lines.reduce((acc, line) => {
    if (
      combineOperations(line.numbers, operations).some(
        (op) => op.result === line.res
      )
    ) {
      acc.push(line);
    }

    return acc;
  }, []);

  //console.log(lines, valid);
  console.log(valid.reduce((acc, line) => acc + line.res, 0));
}

const operations = { "+": (a, b) => a + b, "*": (a, b) => a * b };

function combineOperations(numbers, operations) {
  const results = [];

  function buildExpression(index, expression, result) {
    if (index === numbers.length - 1) {
      results.push({ expression, result });
      return;
    }

    for (const op of Object.keys(operations)) {
      buildExpression(
        index + 1,
        expression + op + numbers[index + 1],
        operations[op](result, numbers[index + 1])
      );
    }
  }

  buildExpression(0, numbers[0].toString(), numbers[0]);

  return results;
}
