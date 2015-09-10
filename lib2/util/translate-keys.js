"use strict";

function mapKeysAndValues(obj, cb) {
  return Object.keys(obj).reduce(function (result, key) {
    var pair = cb(obj[key], key, obj);
    result[pair[0]] = pair[1];
    return result;
  }, {});
}
function mapKeys(obj, cb) {
  return mapKeysAndValues(obj, function (value, key) {
    return [cb(value, key, obj), value];
  });
}

module.exports = function translateKeys(keyMap, obj) {
  if (typeof obj !== "object") {
    throw new Error("needs an object");
  }
  return mapKeys(obj, function (value, key) {
    var newKey = keyMap[key];
    if (newKey == null) {
      throw new Error("Key not found in translator.");
    }
    return newKey;
  });
};