var DELAY = 10;

function jsonStub (url, settings, callback) {
  setTimeout(callback, DELAY);
}

function jsonFailStub (url, settings, callback) {
  setTimeout(function () {
    callback(new Error());
  }, DELAY);
}

module.exports = {
  success: jsonStub,
  fail: jsonFailStub,
};
