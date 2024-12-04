import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("2024/02/input.txt");

  const lines = input.split("\n").map((line) =>
    line
      .split(" ")
      .filter((x) => x.length)
      .map(Number)
  );

  const safe = lines.reduce((res, line) => {
    if (!getIsSafe(line, line.length)) {
      return [...res];
    }

    return [...res, line];
  }, []);

  console.log(safe.length); // 328
}

function getIsSafe(arr, totalItems, indexToRemove) {
  const line = [...arr];
  if (indexToRemove !== undefined) {
    line.splice(indexToRemove, 1);
  }

  let type = "";
  for (let i = 1; i < line.length; i++) {
    if (line[i] === line[i - 1]) {
      type = "error";
      break;
    }

    switch (type) {
      case "inc":
        type = line[i] < line[i - 1] ? "error" : type;
        break;
      case "dec":
        type = line[i] > line[i - 1] ? "error" : type;
        break;
      case "":
        type = line[i] > line[i - 1] ? "inc" : "dec";
        break;
    }

    if (Math.abs(line[i] - line[i - 1]) > 3) {
      type = "error";
    }

    if (type === "error") {
      break;
    }
  }

  const nextIndex = (indexToRemove ?? -1) + 1;

  return type !== "error"
    ? true
    : indexToRemove === undefined || nextIndex < totalItems
    ? getIsSafe(arr, totalItems, nextIndex)
    : false;
}
