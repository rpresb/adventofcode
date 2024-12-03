const year = process.argv[2];
const day = process.argv[3];
const part = process.argv[4];

(async () => {
  const { default: script } = await import(
    `./${year}/${day.padStart(2, "0")}/part${part}.js`
  );

  console.log("running", script, year, day.padStart(2, "0"));
  script();
})();
