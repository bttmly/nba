"use strict";

var qs = require("query-string");

function RequestError (url, query) {
  this.url = url + "?" + qs.stringify(query);
  this.message = "Request failed: " + this.url;
}

RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.constructor = RequestError;

function ParameterError (url, query, msg) {
  this.url = url + "?" + qs.stringify(query);
  this.message = msg;
}

ParameterError.prototype = Object.create(Error.prototype);
ParameterError.prototype.constructor = ParameterError;

module.exports = {
  RequestError: RequestError,
  ParameterError: ParameterError
};
