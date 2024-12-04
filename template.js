import { readInput } from "../../helper.js";

export default function exec() {
  const input = readInput("[year]/[day]/input.txt");

  const lines = input.split("\n").map((line) =>
    line
      .split(" ")
      .filter((x) => x.length)
      .map(Number)
  );
}
