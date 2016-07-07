const qs = require("querystring");
const { format } = require("util");

const partial = require("lodash.partial");

const endpoints = require("./stats-endpoints");
const dicts = require("./dicts");
const translateKeys = require("./util/translate-keys");
const params = require("./params");

let transport = require("./get-json");

const translate = partial(translateKeys, dicts.jsToNbaMap);

const NO_CHECK = {
  PlayerID: 1,
  TeamID: 1,
  GameID: 1,
  SeasonID: 1,
  gameDate: 1,
};

const stats = Object.create({
  setTransport (_transport) {
    transport = _transport;
  },
  getTransport () {
    return transport;
  },
});

Object.keys(endpoints).forEach(key => {
  stats[key] = makeStatsMethod(endpoints[key]);
});

function getDefault (key) {
  if (params[key] == null) {
    throw new Error(format("Unknown paramater:", key));
  }
  return params[key][params.DEFAULT];
}

function logInvalid (ps) {
  ps.forEach(function (p) {
    if (params[p] == null) {
      console.log("NO VALUE OBJECT FOR", p);
    }
  });
}

function makeStatsMethod (endpoint) {

  if (endpoint.params == null) {
    endpoint.params = Object.keys(endpoint.defaults);
    delete endpoint.defaults;
  }

  logInvalid(endpoint.params);

  function statsMethod (query, callback) {

    if (typeof query === "function") {
      callback = query;
      query = {};
    }

    if (typeof callback !== "function") {
      throw new TypeError("Must pass a callback function.");
    }

    const defaults = {
      ...(endpoint.defaults || {}), 
      ...(endpoint.params || []).reduce(function (obj, key) {
        obj[key] = getDefault(key);
        return obj;
      }, {}),
    };

    const translated = translate(query);

    Object.keys(translated).forEach(function (name) {
      if (NO_CHECK.hasOwnProperty(name)) {
        return;
      }

      if (params[name][translated[name]] == null) {
        console.log("invalid value for", name, ":", translated[name]);
      }
    });

    const reqParams = {...defaults, ...translated};

    // console.log(endpoint.url + "?" + qs.stringify(reqParams));

    transport(endpoint.url, reqParams, function (err, response) {
      if (err) return callback(err);

      if (response == null) return callback();

      // response is something like "GameID is required"
      if (typeof response === "string") return callback(new Error(response));

      if (endpoint.transform) return callback(null, endpoint.transform(response));
      callback(null, response);
    });
  }

  statsMethod.params = endpoint.params || Object.keys(endpoint.defaults);

  return statsMethod;
}

module.exports = stats;
