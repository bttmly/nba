# NBA API
*Wrapper for the NBA's stats API for the browser or Node*

## Stability Disclaimer

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
`http://stats.nba.com/stats/playerprofile`
`http://stats.nba.com/stats/commonplayerinfo`
`http://stats.nba.com/stats/commonallplayers`
`http://stats.nba.com/stats/teamdashboardbygeneralsplits`
`http://stats.nba.com/stats/playerdashboardbygeneralsplits`
`http://stats.nba.com/stats/shotchartdetail`
`http://stats.nba.com/stats/scoreboard/`
`http://stats.nba.com/stats/playbyplay`
`http://stats.nba.com/stats/boxscorescoring`
`http://stats.nba.com/stats/boxscoreusage`
`http://stats.nba.com/stats/boxscoremisc`
`http://stats.nba.com/stats/boxscoreadvanced`
`http://stats.nba.com/stats/boxscorefourfactors`

### Strategies
This API wrapper gets data in two main ways. Data from NBA stats is accessible over a public JSON REST API. It supports JSONP, so in the browser we just use a tiny, custom, promise-returning implementation for that. In Node we delegate to `request` module. The implementations are interchangable.

The SportVu service provides data differently, as actual .js files that expose a global variable. I have no clue why they elected to do it this way. Anyway, there are similar browser/Node strategies for these files also. The browser implementation is similar to the JSONP strategy, while the Node version uses the [`vm` module]().

### The Problem with JSONP
JSONP is generally miserable at handling errors.

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

The API serves data in an efficient, though tricky to use, manner. In a typical JSON response, the keys of each object may be repeated many times. Indeed, repeated keys might make up a substantial percentage of the size of the response. The NBA's API instead returns an array of header values and an array of rows, which need to be combined by index to produce objects. `util.js` contains a "collectify" function which turns an array of headers, and an array of rows (a two-dimensional array) into a collection of objects. The implementation is:

```js
function collectify ( headers, rows ) {
  return rows.map( function ( item ) {
    return item.reduce( function ( model, val, i ) {
      model[ headers[i] ] = val;
      return model;
    }, {} );
  });
}
```

### Included JSON?
Players, teams, and games are identified by a unique ID assigned by the NBA. Unfortunately, as far as I can tell, there isn't a way to make queries based on a player's (or team's) name. This wrapper allows queries based on names, but at a cost: it needs an internal list of teams and players to locate the correct ID. The `dist` folder includes two versions of the wrapper: `nba.js` and `nba-light.js`. The `nba.js` file has these lists bundled into the source code. The light version issues requests for these lists when it is loaded (or required). The `nba.ready()` method is provided to give users a way to execute code once these lists are prepared. In the light version, this code is run once both requests return.

```js
nba.ready(function () {
  // lists of players and teams are available.
});
```
Whether you use the light or full version depends on your use case -- the full version is _substantially_ larger.

## SportVu Data
The NBA's player tracking system, SportVu, provides data in a totally different form, and it's not query-able. 
