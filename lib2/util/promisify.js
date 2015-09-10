"use strict";

var promisify = function promisify(Prms) {
  return function (func) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new Prms(function (resolve, reject) {
        func.apply(undefined, args.concat([function (err, result) {
          if (err) return reject(err);
          resolve(result);
        }]));
      });
    };
  };
};

var promisifyAll = function promisifyAll(obj, Prms) {
  var _promisify = promisify(Prms);

  var out = Object.create(Object.getPrototypeOf(obj));
  Object.keys(obj).forEach(function (key) {
    out[key] = _promisify(obj[key]);
  });
  return out;
};

module.exports = { promisify: promisify, promisifyAll: promisifyAll };