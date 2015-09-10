const {interpolate} = require("./util/string");
let transport = require("./get-json");

const URL_ROOT = "http://stats.nba.com/js/data/sportvu/__season__/speedData.json"

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

const DEFAULT_SEASON = 2014;

const makeUrl = interpolate(URL_ROOT);

const sportVu = Object.create({
  setTransport (_transport) {
    transport = _transport;
  },
});

SPORT_VU_STATS.forEach(stat => {
  sportVu[stat] = makeSportVuMethod(stat);
});

function makeSportVuMethod (stat) {
  return function sportVuMethod (options, callback) {

    if (typeof options === "function") {
      callback = options;
      options = {};
    }

    if (typeof callback !== "function") {
      throw new TypeError("Must pass a callback function.");
    }

    options.season = options.season || DEFAULT_SEASON;

    transport(makeUrl(options), {}, callback);
  }
}

module.exports = sportVu;
