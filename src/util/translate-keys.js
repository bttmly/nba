const mapKeys = require("lodash.mapkeys");

module.exports = function translateKeys (oldToNewMap, obj) {
  if (typeof obj !== "object") {
    throw new Error("needs an object");
  }

  return mapKeys(obj, function (value, oldKey) {
    const newKey = oldToNewMap[oldKey];

    if (newKey == null) {
      throw new Error(`Key '${oldKey}' not found in translator.`);
    }

    return newKey;
  });
};
