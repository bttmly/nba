const defaults = {
  season: 2015,
};

function sportVuTransform (x) { return x; }

module.exports = [
  {
    name: "speed",
    url:  "http://stats.nba.com/js/data/sportvu/__season__/speedData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  {
    name: "touches",
    url:  "http://stats.nba.com/js/data/sportvu/__season__/touchesData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  {
    name: "passing",
    url:  "http://stats.nba.com/js/data/sportvu/__season__/passingData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  {
    name: "defense",
    url: "http://stats.nba.com/js/data/sportvu/__season__/defenseData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  {
    name: "rebounding",
    url: "http://stats.nba.com/js/data/sportvu/__season__/reboundingData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  {
    name: "drives",
    url: "http://stats.nba.com/js/data/sportvu/__season__/drivesData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  {
    name: "shooting",
    url: "http://stats.nba.com/js/data/sportvu/__season__/shootingData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  {
    name: "catchShoot",
    url: "http://stats.nba.com/js/data/sportvu/__season__/catchShootData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  {
    name: "pullUpShoot",
    url: "http://stats.nba.com/js/data/sportvu/__season__/pullUpShootData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
];
