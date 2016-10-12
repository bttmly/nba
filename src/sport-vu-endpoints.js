
const defaults = { season: 2015 };

module.exports = [
  {
    name: "speed",
    url:  "http://stats.nba.com/js/data/sportvu/__season__/speedData.json",
    defaults: defaults,
  },
  {
    name: "touches",
    url:  "http://stats.nba.com/js/data/sportvu/__season__/touchesData.json",
    defaults: defaults,
  },
  {
    name: "passing",
    url:  "http://stats.nba.com/js/data/sportvu/__season__/passingData.json",
    defaults: defaults,
  },
  {
    name: "defense",
    url: "http://stats.nba.com/js/data/sportvu/__season__/defenseData.json",
    defaults: defaults,
  },
  {
    name: "rebounding",
    url: "http://stats.nba.com/js/data/sportvu/__season__/reboundingData.json",
    defaults: defaults,
  },
  {
    name: "drives",
    url: "http://stats.nba.com/js/data/sportvu/__season__/drivesData.json",
    defaults: defaults,
  },
  {
    name: "shooting",
    url: "http://stats.nba.com/js/data/sportvu/__season__/shootingData.json",
    defaults: defaults,
  },
  {
    name: "catchShoot",
    url: "http://stats.nba.com/js/data/sportvu/__season__/catchShootData.json",
    defaults: defaults,
  },
  {
    name: "pullUpShoot",
    url: "http://stats.nba.com/js/data/sportvu/__season__/pullUpShootData.json",
    defaults: defaults,
  },
];
