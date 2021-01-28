# nba
*Node.js client for nba.com API endpoints*

`npm install nba`

## NOTES:

### BLACKLISTED IP ADDRESSES:
It appears as though the NBA has blacklisted certain blocks of IP addresses, specifically those of cloud hosting providers including AWS. As such, you may hit a situation where an application using this package works fine on your local machine, but doesn't work at all when deployed to a cloud server. Annoyingly, requests from these IPs seem to just hang. More information [here](https://github.com/bttmly/nba/issues/41) and [here](https://github.com/seemethere/nba_py/issues/88) -- the second issue has a `curl` command somewhere which will quickly tell you if NBA is accepting requests from your IP. (Incidentally, this is also the same reason the TravisCI build is always "broken" but tests all pass locally). There is a simple pass-through server in `scripts/proxy` that can be used to get around this restriction; you can put the proxy server somewhere that can reach NBA.com (e.g. not on AWS or Heroku or similar) and host your actual application on a cloud provider.

### CORS restrictions on browser usage
This package can't be used directly from the browser because of [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) restrictions imposed by nba.com. If you run some sort of intermediate server which relays requests to NBA.com, you can change the host the client points to by following the instructions in the *Transport Layer* section

## NBA API
The [stats.nba.com](http://stats.nba.com) uses a large number of undocumented JSON endpoints to provide the statistics tables and charts displayed on that website. This library provides a JavaScript client for interacting with many of those API endpoints.

## Getting Started

`NBA.findPlayer(str)` will return an object with a player's name, their ID, and their team information. This method is built into the package.

All methods in the `NBA.stats` namespace require an object to be passed in as a parameter. The keys to the object are in the docs for the `stats` namespace [here](doc/stats.md)

```js
const NBA = require("nba");
const curry = NBA.findPlayer('Stephen Curry');
console.log(curry);
/* logs the following:
{
  firstName: 'Stephen',
  lastName: 'Curry',
  playerId: 201939,
  teamId: 1610612744,
  fullName: 'Stephen Curry',
  downcaseName: 'stephen curry'
}
*/
NBA.stats.playerInfo({ PlayerID: curry.playerId }).then(console.log);
```

For more example API calls, see `/test/integration/stats.js` and other test files.

## Stability Warning
This is a client for an unstable and undocumented API. While I try to follow [semver](http://semver.org/) for changes to the JavaScript API this library exposes, the underlying HTTP API can (and has) changed without warning. In particular, the NBA has repeatedly deprecated endpoints, or added certain required headers without which requests will fail. Further, this library comes bundled with a (relatively) up-to-date list of current NBA players which is subject to change at any time -- the specific contents of it should not be considered part of this library's API contract.

## Usability
To put it nicely, the NBA's API endpoints are a little clunky to work with. This library tries to strike a balance between being usable but not making assumptions about how the data will be used. Specifically, the NBA sends data in a concise "table" form where the column headers come first then each result is an array of values that need to be matched with the proper header. This library does a simple transformation to zip the header and values arrays into a header-keyed object. Beyond that, it tries to not do too much. This is important to note because sometimes the various "result sets" that come back on a single endpoint seem sort of arbitrary. The underlying HTTP API doesn't seem to follow standard REST practices; rather it seems the endpoints are tied directly to the data needed by specific tables and charts displayed on [stats.nba.com](). This is what I mean by "clunky" to work with -- it can be tricky to assemble the data you need for a specific analysis from the various endpoints available.

## Documentation
_still lots to do here..._

There are four primary parts of this library
- *Top-level methods*
- *`stats` namespace* &mdash; [docs](https://github.com/bttmly/nba/blob/master/doc/stats.md)
- *`synergy` namespace* [see tests](https://github.com/bttmly/nba/blob/master/test/integration/synergy.js)
– *`data` namespace* [see tests](https://github.com/bttmly/nba/blob/master/test/integration/data.js)
- *~`sportVu` namespace*~ NBA has removed sportVu endpoints. the methods exist here for backwards compatibility but they throw errors

## Transport Layer
In some cases you will want to use a different transport layer to handle HTTP requests. Perhaps you have an HTTP client library you like better than what I used here. Better yet, you want to get stats for the WNBA or the G League. The following code snippet shows how to use the `withTransport` method to create a new client with your own transport function.

```js
// here we are getting stats for the WNBA!

const nba = require("nba");
const getJSON = require("nba/src/get-json");

// for the G League, try "stats.gleague.nba.com"
const newHost = "stats.wnba.com";

const transport = (url, params, options) => {
  // simply swap the host and then defer the rest to the built in getJSON function
  const fixedURL = url.replace("stats.nba.com", "stats.wnba.com");
  return getJSON(fixedURL, params, options);
};

// create a new stats client here with our WNBA transport
const wnbaStats = nba.stats.withTransport(transport);

(async () => {
  const result = await wnbaStats.playerInfo({ PlayerID: "1628886" });
  console.log(result);
})();
```

## "I don't use Node.js"
Please take a look at [nba-client-template](http://github.com/bttmly/nba-client-template). The relevant part of the repo is a single JSON document from which many programming languages can dynamically generate an API client. The repo contains (sloppy) examples in [Ruby](https://github.com/bttmly/nba-client-template/blob/master/example-clients/simple-client.rb) and [Python](https://github.com/bttmly/nba-client-template/blob/master/example-clients/simple-client.py). Compiled languages can use code generation techniques to the same effect -- there's a (again, sloppy) example in [Go](https://github.com/bttmly/nba-client-template/tree/master/example-clients/golang). If you'd like me to publish it to a specific registry so you can install it with your language's package manager, please [open an issue](http://github.com/bttmly/nba-client-template/issues). Please note, however, that package only includes  the endpoints exposed by this library under the `stats` namespace -- `sportvu` and `synergy` endpoints aren't yet included in it. I also plan to add a command-line interface to this library so that it can be easily driven as a child process by another program.

##
