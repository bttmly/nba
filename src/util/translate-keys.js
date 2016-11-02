const mapKeys = require("lodash.mapkeys");

module.exports = function translateKeys (translationMap, target) {
  if (typeof target !== "object") {
    throw new Error("needs an object");
  }

  return mapKeys(target, function (value, oldKey) {
    const newKey = translationMap[oldKey];

    if (newKey == null) {
      throw new Error(`Key '${oldKey}' not found in translator.`);
    }

    return newKey;
  });
};
