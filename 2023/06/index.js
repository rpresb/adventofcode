module.exports = () => {
  console.log("Part 1 ===>", part1());
  console.log("Part 2 ===>", part2());
};

function part1() {
  return data.reduce((total, race) => {
    let subtotal = 0;
    for (let speed = 1; speed < race.time; speed++) {
      const distance = (race.time - speed) * speed;

      if (distance > race.distance) {
        subtotal++;
      }
    }

    if (subtotal === 0) {
      return total;
    }

    return total * subtotal;
  }, 1);
}

function part2() {
  return data2.reduce((total, race) => {
    let subtotal = 0;
    for (let speed = 1; speed < race.time; speed++) {
      const distance = (race.time - speed) * speed;

      if (distance > race.distance) {
        subtotal++;
      }
    }

    if (subtotal === 0) {
      return total;
    }

    return total * subtotal;
  }, 1);
}

const dataTest = [
  { time: 7, distance: 9 },
  { time: 15, distance: 40 },
  { time: 30, distance: 200 },
];

const dataTest2 = [{ time: 71530, distance: 940200 }];

const data = [
  { time: 49, distance: 298 },
  { time: 78, distance: 1185 },
  { time: 79, distance: 1066 },
  { time: 80, distance: 1181 },
];

const data2 = [{ time: 49787980, distance: 298118510661181 }];
