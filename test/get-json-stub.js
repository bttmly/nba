var DELAY = 10;

function jsonStub (url, settings) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), DELAY);
  });
}

function jsonFailStub (url, settings, callback) {
  return new Promise(function (__, reject) {
    setTimeout(() => reject(new Error()), DELAY)
  });
}

module.exports = {
  success: jsonStub,
  fail: jsonFailStub,
};
