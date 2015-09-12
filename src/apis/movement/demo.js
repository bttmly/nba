const fs = require("fs");
const {exec} = require("child_process");

const _ = require("lodash");
const jsonStream = require("jsonstream");

const FILE = __dirname + "/plays.json";

fs.writeFileSync(FILE, "");

const owd = process.cwd();

process.chdir(__dirname);

const movement = require("./");

// movement
//   .streamPlayMovementForGame("0021401228")
//   .pipe(jsonStream.stringify())
//   .pipe(fs.createWriteStream(FILE));

const ee = movement.getPlayMovementForGame("0021401228");
ee.on("data", data => fs.appendFileSync(FILE, JSON.stringify(data) + "\n"));
ee.on("end", () => {
  exec("head -1 plays.json > head.json", (err, out) => {
    if (err) throw err;
    process.chdir(owd);
    console.log("COMPLETE");
  });
});
