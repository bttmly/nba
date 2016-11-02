const path = require("path");
const fs = require("fs");

const nba = require("..");

const respDir = path.join(__dirname, "../responses");

const updateAt = (n, f) => (arr) => {
  copy = arr.slice();
  copy[n] = f(copy[n]);
  return copy;
};
const invokeAt = (n, f) => (arr) => f(arr[n]);
const not = f => (...args) => !f(...args);
const test = re => s => re.test(s);

Object.prototype.into = function (fn, ...args) { return fn(this, ...args); };
Object.prototype.onto = function (fn, ...args) { return fn(...args, this); };
Object.prototype.tap = function (fn) { fn(this); return this; };

fs.readdirSync(respDir)
  .filter(test(/stats\-/))
  .map(f => path.join(respDir, f))
  .map(f => [f, fs.readFileSync(f)])
  .map(updateAt(1, JSON.parse))
  .filter(invokeAt(1, not(Array.isArray)))
  .map(statsEndpointDocs)
  .map(endpointMarkdown)
  .into(writeMarkdown);

function statsEndpointDocs ([fileName, fileContents]) {
  const methodName = fileName.match(/stats\-(\w+)\.json/)[1];
  const {defaults} = nba.stats[methodName];
  const responseShape = generateResponseShape(fileContents);
  return {methodName, defaults, responseShape};
}

function generateResponseShape (contents) {
  if (Array.isArray(contents)) {
    return arrayResponseShape(contents);
  }
  return objectResponseShape(contents);
}

function objectResponseShape (obj) {
  const keys = Object.keys(obj);
  const out = {};
  keys.forEach(k => out[k] = generateLeafShape(obj[k]));
  return out;
}

function generateLeafShape (leaf) {
  return Object.keys(leaf).reduce(function (shape, key) {
    shape[key] = typeof leaf[key];
    return shape;
  }, {});
}

function endpointMarkdown ({methodName, defaults, responseShape}) {
  const pieces = [];
  pieces.push(`## \`nba.stats.${methodName}(params) -> Promise\``);
  pieces.push(`#### Default parameters`);
  Object.keys(defaults).forEach(function (key) {
    pieces.push(`- \`${key}: ${JSON.stringify(defaults[key])}\``);
  });
  pieces.push("\n\n");
  // pieces.push("\n\n -- END SECTION -- \n\n");
  return pieces;
}

function writeMarkdown (docs) {
  [].concat(...docs)
    .join("\n")
    .onto(fs.writeFileSync, path.join(__dirname, "../doc/stats.md"));
}
