# nba [![Build Status](https://travis-ci.org/nickb1080/nba.svg?branch=master)](https://travis-ci.org/nickb1080/nba)
*The NBA's stats API for the browser or Node*

`npm install nba`

## Stability Disclaimer [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This project is in heavy development and is subject to breaking changes without notice.

## Intro

As far as I can tell, the NBA's stats API does not have public documentation. As such, it's unclear what the acceptable values are for certain query parameters. Most of what's in here is based on inspecting the parameters [stats.nba.com](http://stats.nba.com/) uses in its own requests. I also took some pointers from the source of [this repo](https://github.com/Caged/nba-player-tracking). Suggestions on a more comprehensive approach, or contributions, are extremely welcome.

I also couldn't find anything on the terms of use. If you know of a relevant policy, please point me to it.

The peculiar structure of the NBA stats API enforced some specific design considerations. 

## Roadmap

### Primary Focus
**Implement methods mapping to various `http://stats.nba.com/stats/{xyz}` endpoints**
Unfortunately, the endpoints aren't documented, so there's no good way to quickly determine how many of them there might be. So far, I've collected a preliminary list by poking around the Network panel in Dev Tools. 

However, I've written infrastructure code that makes adding a new endpoint really easy. The meat of each method is a single function call to `getJSON` (discussed later) with the URL path, and an object representing the querystring.

The following endpoints are implemented currently:
- `http://stats.nba.com/stats/playerprofile`
- `http://stats.nba.com/stats/commonplayerinfo`
- `http://stats.nba.com/stats/commonallplayers`
- `http://stats.nba.com/stats/teamdashboardbygeneralsplits`
- `http://stats.nba.com/stats/playerdashboardbygeneralsplits`
- `http://stats.nba.com/stats/shotchartdetail`
- `http://stats.nba.com/stats/scoreboard/`
- `http://stats.nba.com/stats/playbyplay`
- `http://stats.nba.com/stats/boxscorescoring`
- `http://stats.nba.com/stats/boxscoreusage`
- `http://stats.nba.com/stats/boxscoremisc`
- `http://stats.nba.com/stats/boxscoreadvanced`
- `http://stats.nba.com/stats/boxscorefourfactors`

The endpoints above correspond to the following methods available on `nba.api`:

- `playerProfile([Object options], Function callback)`
- `playerInfo([Object options], Function callback)`
- `playersInfo([Object options], Function callback)`
- `teamStats([Object options], Function callback)`
- `teamSplits([Object options], Function callback)`
- `teamYears([Object options], Function callback)`
- `playerSplits([Object options], Function callback)`
- `shots([Object options], Function callback)`
- `scoreboard([Object options], Function callback)`
- `playByPlay([Object options], Function callback)`
- `boxScoreScoring([Object options], Function callback)`
- `boxScoreUsage([Object options], Function callback)`
- `boxScoreMisc([Object options], Function callback)`
- `boxScoreAdvanced([Object options], Function callback)`
- `boxScoreFourFactors([Object options], Function callback)`

Each method has the same signature: an optional options hash (which will be translated into a query string), and a callback function. 

**Note**: This library was previously written such that each API call method returned a Promise. However, Promises are just one of a number of async abstractions available to developers: FRP libraries like Bacon or RxJS, async streams a la Highland.js, ES6 generators, and certainly more in the future. Because of the prevalance of standard Node-style callbacks, there are conventions in place for transforming callbacks into higher-level abstractions.Thus, providing Node-style callbacks at the library level, and allowing library consumers to use their preferred async abstraction (or none) seems like cleaner design. [Bluebird](https://github.com/petkaantonov/bluebird) is an excellent library for "promisifying". You can use it's `.promisifyAll` method on `nba.api`. The [Q library](https://github.com/kriskowal/q/wiki/API-Reference#interfacing-with-nodejs-callbacks) has similar helpers.

### The Problem with JSONP
JSONP is generally miserable at handling errors or providing any useful information whatsoever about them.

### Data
Stats responses generally arrive in an object like so:

```js
{
  resouce: "boxscore",
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
