const defaults = {
  season: 2014,
};

function sportVuTransform (x) { return x; }

module.exports = {
  "speed": {
    url:  "http://stats.nba.com/js/data/sportvu/__season__/speedData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  "touches": {
    url:  "http://stats.nba.com/js/data/sportvu/__season__/touchesData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  "passing": {
    url:  "http://stats.nba.com/js/data/sportvu/__season__/passingData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  "defense": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/defenseData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  "rebounding": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/reboundingData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  "drives": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/drivesData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  "shooting": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/shootingData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  "catchShoot": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/catchShootData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
  "pullUpShoot": {
    url: "http://stats.nba.com/js/data/sportvu/__season__/pullUpShootData.json",
    defaults: defaults,
    transform: sportVuTransform,
  },
};
