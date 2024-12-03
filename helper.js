import fs from "node:fs";
import path from "node:path";

export function readInput(filename) {
  return fs.readFileSync(path.resolve(filename), {
    encoding: "utf-8",
  });
}
