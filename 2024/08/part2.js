import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/08/input.txt");

  const matrix = input.split("\n").map((line) => line.split(""));

  let antennas = {};
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== ".") {
        const cache = antennas[matrix[i][j]] || [];
        antennas = {
          ...antennas,
          [matrix[i][j]]: [...cache, [i, j]],
        };
      }
    }
  }

  const antinodes = new Set();

  for (let antenna of Object.keys(antennas)) {
    const points = antennas[antenna];
    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const [y1, x1] = points[i];
        antinodes.add(points[i].join(","));

        const [y2, x2] = points[j];
        antinodes.add(points[j].join(","));

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);

        let doubleBefore = [y1 - dy, x2 > x1 ? x1 - dx : x1 + dx];

        while (matrix[doubleBefore[0]]?.[doubleBefore[1]]) {
          antinodes.add(doubleBefore.join(","));

          doubleBefore = [
            doubleBefore[0] - dy,
            doubleBefore[1] + (x2 > x1 ? -dx : dx),
          ];
        }

        let doubleAfter = [y2 + dy, x2 > x1 ? x2 + dx : x2 - dx];

        while (matrix[doubleAfter[0]]?.[doubleAfter[1]]) {
          antinodes.add(doubleAfter.join(","));

          doubleAfter = [
            doubleAfter[0] + dy,
            doubleAfter[1] + (x2 > x1 ? dx : -dx),
          ];
        }
      }
    }
  }

  console.log(
    matrix
      .map((line, li) =>
        line
          .map((col, ci) => {
            if (col === "." && antinodes.has(`${li},${ci}`)) return "#";
            return col;
          })
          .join("")
      )
      .join("\n")
  );
  console.log("antinodes", antinodes.size);
}
