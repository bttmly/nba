let transport = require("./get-script");

const URL_ROOT = "http://stats.nba.com/js/data/sportvu/";

const SPORT_VU_STATS = [
  "speed",
  "touches",
  "passing",
  "defense",
  "rebounding",
  "drives",
  "shooting",
  "catchShoot",
  "pullUpShoot",
];

const proto = {
  setTransport (_transport) {
    transport = _transport;
  },
};

const sportVu = Object.create(proto);

SPORT_VU_STATS.forEach(stat => {
  sportVu[stat] = makeSportVuMethod(stat);
});

function makeSportVuMethod (stat) {
  return function sportVuMethod (callback) {

    if (typeof callback !== "function") {
      throw new TypeError("Must pass a callback function.");
    }

    const varName = stat + "Data";
    const scriptUrl = URL_ROOT + stat + "Data.js";

    transport(scriptUrl, varName, callback);
  }
}

module.exports = sportVu;
