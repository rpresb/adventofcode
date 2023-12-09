// COPIED FROM https://github.com/malciin/aoc2023/blob/master/day05.ts

module.exports.part2 = function (data) {
  const parseNumbers = (str) =>
    str
      .split(" ")
      .filter((x) => x !== "")
      .map((x) => parseInt(x));
  const groupNumbers = (numbers, grouping) =>
    Array.from({ length: numbers.length / grouping }, (_, i) =>
      numbers.slice(i * grouping, i * grouping + grouping)
    );

  const input = data
    .replaceAll(/\n(\d)/g, " $1")
    .split("\n")
    .filter((x) => x !== "")
    .map((x) => parseNumbers(x.split(":")[1]));
  const seeds = input[0];
  const almanac = input.slice(1).map((x) => groupNumbers(x, 3));

  function getSeedLocation(step) {
    for (const almanacEntry of almanac) {
      for (const [destination, source, length] of almanacEntry) {
        if (source <= step && source + length > step) {
          step = destination + step - source;
          break;
        }
      }
    }

    return step;
  }

  const seedRanges = groupNumbers(seeds, 2);
  const doWeHaveThatSeed = (seed) =>
    seedRanges.some(
      ([seedStart, length]) => seedStart <= seed && seedStart + length >= seed
    );

  // inversion of getSeedLocation function
  function getSeedGivenLocation(step) {
    for (const almanacEntry of almanac.slice().reverse()) {
      for (const [destination, source, length] of almanacEntry) {
        if (destination <= step && destination + length > step) {
          step = source + step - destination;
          break;
        }
      }
    }

    return step;
  }

  // problem inversed, rather than enumerating on enormous amount of seeds we enumerating on
  // ascending locations and checks if we have got seed for that location 🤡
  // Tooks ~8 seconds to compute on my pc 🤡🤡🤡
  for (let i = 0; i < 1_000_000_000; i++) {
    const seed = getSeedGivenLocation(i);

    if (doWeHaveThatSeed(seed)) {
      return i;
    }
  }
};
