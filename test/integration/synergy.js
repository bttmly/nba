const nba = require("../../");

const path = require("path");
const pify = require("pify");
const writeFile = pify(require("fs").writeFile);

const dir = path.join(__dirname, "../../responses");
function writeData (name, data) {
  const str = JSON.stringify(data, null, 2);
  return writeFile(path.join(dir, `synergy-${name}.json`), str);
}

global.SynergyData = {};

const callMethod = (name, params = {}) => async () => {
  params.season = 2016;
  const resp = await nba.synergy[name](params);
  return writeData(`${name}-${params.category}`, resp);
};

describe("nba synergy API", () => {
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

  categories.forEach((c) => {
    it(`category ${c}`, callMethod("playerPlayType", {category: c}));
  });
});
