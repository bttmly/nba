const nba = require("../../lib");

const path = require("path");
const pify = require("pify");
const writeFile = pify(require("fs").writeFile);

const dir = path.join(__dirname, "../../responses");
function writeData (name, data) {
  const str = JSON.stringify(data, null, 2);
  return writeFile(path.join(dir, `synergy-${name}.json`), str);
}

global.SynergyData = {};

// stub for now, will add response shape verification for self-documenting responses
const verifyShape = shape => response => response;

const callMethod = (name, params = {}, shape) => () => {
  params.season = 2016;
  return nba.synergy[name](params)
    .then(function (resp) {
      writeData(`${name}-${params.category}`, resp);
    });
};

describe("nba synergy API", function () {
  const categories = [
    "Transition",
    "PRBallHandler",
    "PRRollman",
    "Postup",
    "Spotup",
    "Handoff",
    "Cut",
    "OffScreen",
    "OffRebound",
    "Misc",
  ];

  categories.forEach(function (c) {
    it(`category ${c}`, callMethod("playerPlayType", {category: c}));
  });
});
