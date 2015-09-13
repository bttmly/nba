# nba [![Build Status](https://travis-ci.org/nickb1080/nba.svg?branch=master)](https://travis-ci.org/nickb1080/nba) [![Coverage Status](https://coveralls.io/repos/nickb1080/nba/badge.svg?branch=master&service=github)](https://coveralls.io/github/nickb1080/nba?branch=master)
*The NBA's stats API for the browser or Node*

`npm install nba`

## Stability Disclaimer [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This project is in heavy development and is subject to breaking changes without notice.

## RE: This Readme
It's a little out of date. Just finished a big refactor and cleanup, getting this readme in shape is next on my list. -9/10/15

## API

As far as I can tell, the NBA's stats API does not have public documentation. As such, it's unclear what the acceptable values are for certain query parameters. Most of what's in here is based on inspecting the parameters [stats.nba.com](http://stats.nba.com/) uses in its own requests. I also took some pointers from the source of [this repo](https://github.com/Caged/nba-player-tracking). Suggestions on a more comprehensive approach, or contributions, are extremely welcome.

I also couldn't find anything on the terms of use. If you know of a relevant policy, please point me to it.

The peculiar structure of the NBA stats API enforced some specific design considerations. 

The following are the methods implemented on `nba.api`. Each one takes an options hash which is transformed into a query string, and a callback. For usage examples see [/test/integration/api.js](https://github.com/nickb1080/nba/blob/master/test/integration/api.js).


#### `playerProfile`
`playerProfile([Object options], Function callback)`

http://stats.nba.com/stats/playerprofile


#### `playerInfo`
`playerInfo([Object options], Function callback)`

http://stats.nba.com/stats/commonplayerinfo


#### `playersInfo`
`playersInfo([Object options], Function callback)`

http://stats.nba.com/stats/commonallplayers


#### `teamStats`
`teamStats([Object options], Function callback)`

http://stats.nba.com/stats/leaguedashteamstats


#### `teamSplits`
`teamSplits([Object options], Function callback)`

http://stats.nba.com/stats/teamdashboardbygeneralsplits


#### `teamYears`
`teamYears([Object options], Function callback)`

http://stats.nba.com/stats/commonteamyears


#### `playerSplits`
`playerSplits([Object options], Function callback)`

http://stats.nba.com/stats/playerdashboardbygeneralsplits


#### `shots`
`shots([Object options], Function callback)`

http://stats.nba.com/stats/shotchartdetail


#### `scoreboard`
`scoreboard([Object options], Function callback)`

http://stats.nba.com/stats/scoreboard


#### `playByPlay`
`playByPlay([Object options], Function callback)`

http://stats.nba.com/stats/playbyplay


#### `boxScoreScoring`
`boxScoreScoring([Object options], Function callback)`

http://stats.nba.com/stats/boxscorescoring


#### `boxScoreUsage`
`boxScoreUsage([Object options], Function callback)`

http://stats.nba.com/stats/boxscoreusage


#### `boxScoreMisc`
`boxScoreMisc([Object options], Function callback)`

http://stats.nba.com/stats/boxscoremisc


#### `boxScoreAdvanced`
`boxScoreAdvanced([Object options], Function callback)`

http://stats.nba.com/stats/boxscoreadvanced


#### `boxScoreFourFactors`
`boxScoreFourFactors([Object options], Function callback)`

http://stats.nba.com/stats/boxscorefourfactors


#### `teamHistoricalLeaders`
`teamHistoricalLeaders([Object options], Function callback)`

http://stats.nba.com/stats/teamhistoricalleaders


#### `teamInfoCommon`
`teamInfoCommon([Object options], Function callback)`

http://stats.nba.com/stats/teaminfocommon


#### `commonTeamRoster`
`commonTeamRoster([Object options], Function callback)`

http://stats.nba.com/stats/commonteamroster


#### `teamPlayerDashboard`
`teamPlayerDashboard([Object options], Function callback)`

http://stats.nba.com/stats/teamplayerdashboard


#### `playerDashPtShotLog`
`playerDashPtShotLog([Object options], Function callback)`

http://stats.nba.com/stats/playerdashptshotlog


#### `playerDashPtReboundLogs`
`playerDashPtReboundLogs([Object options], Function callback)`

http://stats.nba.com/stats/playerdashptreboundlogs



Each method has the same signature: an optional options hash (which will be translated into a query string), and a callback function. 

**Note**: This library was previously written such that each API call method returned a Promise. However, Promises are just one of a number of async abstractions available to developers: FRP libraries like Bacon or RxJS, async streams a la Highland.js, ES6 generators, and certainly more in the future. Because of the prevalance of standard Node-style callbacks, there are conventions in place for transforming callbacks into higher-level abstractions.Thus, providing Node-style callbacks at the library level, and allowing library consumers to use their preferred async abstraction (or none) seems like cleaner design. [Bluebird](https://github.com/petkaantonov/bluebird) is an excellent library for "promisifying". You can use it's `.promisifyAll` method on `nba.api`. The [Q library](https://github.com/kriskowal/q/wiki/API-Reference#interfacing-with-nodejs-callbacks) has similar helpers.

### The Problem with JSONP
JSONP is generally miserable at handling errors or providing any useful information whatsoever about them.

### Data
Stats responses generally arrive in an object like so:

```js
{
  resource: "boxscore",
  parameters: Object, 
  resultSets: Array
}
```

The `resultSets` property has the data. Some requests have a single `resultSet` (i.e. `resultSets.length === 1`). Others have many. A typical item in the `resultSets` array looks like:

```js
{
  headers: Array,
  name: "PlayerStats"
  rowSet: Array
}
```

The API serves data in an efficient, though tricky to use, manner. In a typical JSON response, the keys of each object may be repeated many times. Indeed, repeated keys might make up a substantial percentage of the size of the response. The NBA's API instead returns an array of header values and an array of rows, which need to be combined by index to produce objects. `util.js` contains a "collectify" function which turns an array of headers, and an array of rows (a two-dimensional array) into a collection of objects. All data received in this way from NBA is transformed before being passed out of the API wrapper.

### Included JSON?
Players, teams, and games are identified by a unique ID assigned by the NBA. Unfortunately, as far as I can tell, there isn't a way to make queries based on a player's (or team's) name. This wrapper allows queries based on names, but at a cost: it needs an internal list of teams and players to locate the correct ID. The `dist` folder includes two versions of the wrapper: `nba.js` and `nba-light.js`. The `nba.js` file has these lists bundled into the source code. The light version issues requests for these lists when it is loaded (or required). The `nba.ready()` method is provided to give users a way to execute code once these lists are prepared. In the light version, this code is run once both requests return.

```js
nba.ready(function () {
  // lists of players and teams are available.
});
```
Whether you use the light or full version depends on your use case -- the full version is _substantially_ larger.

## SportVu Data
The NBA's player tracking system, SportVu, provides data in a totally different form. More info on this to come.
