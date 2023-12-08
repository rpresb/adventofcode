const year = process.argv[2];
const day = process.argv[3];

const script = require(`./${year}/${day.padStart(2, "0")}`);

console.log("running", year, day.padStart(2, "0"));
script();
