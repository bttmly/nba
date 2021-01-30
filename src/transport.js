let _defaultTransport = require("./get-json");

function defaultTransport (...args) {
  return _defaultTransport(...args);
}

function setDefaultTransport (t) {
  _defaultTransport = t;
}

module.exports = { defaultTransport, setDefaultTransport };