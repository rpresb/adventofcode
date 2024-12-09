import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/06/input.txt");

  const res = returnPath(parseInput(input));

  let total = 0;
  res.forEach((line) => {
    const resSub = returnPath(parseInput(input), line.split(",").map(Number));
    resSub && total++;
  });

  console.log(total);
}

function returnPath(matrix, extra) {
  const rule = {
    "^": { y: -1, x: 0, next: ">" },
    ">": { y: 0, x: 1, next: "v" },
    v: { y: 1, x: 0, next: "<" },
    "<": { y: 0, x: -1, next: "^" },
  };

  let pos = matrix.reduce(
    (acc, line, idx) => {
      if (line.includes("^")) {
        return [idx, line.indexOf("^")];
      }

      return acc;
    },
    [0, 0]
  );
  let current = { x: pos[1], y: pos[0], direction: "^" };
  matrix[current.y][current.x] = ".";

  if (extra) {
    matrix[extra[0]][extra[1]] = "#";
  }

  const visited = new Set();
  const loops = new Set();

  while (matrix[current.y]?.[current.x]) {
    const next = { ...current };
    while (matrix[next.y]?.[next.x] === ".") {
      !extra && visited.add(`${next.y},${next.x}`);
      next.x += rule[next.direction].x;
      next.y += rule[next.direction].y;
    }

    if (matrix[next.y]?.[next.x] === "#") {
      next.x -= rule[next.direction].x;
      next.y -= rule[next.direction].y;
      next.direction = rule[next.direction].next;

      const key = `${next.direction},${next.y},${next.x}`;
      if (loops.has(key)) {
        return loops;
      }
      loops.add(key);
    }

    current = next;
  }

  return extra ? undefined : visited;
}

function parseInput(input) {
  return input.split("\n").map((line) => line.split(""));
}
