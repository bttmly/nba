var DELAY = 10;

function jsonStub () {
  return new Promise(resolve => setTimeout(resolve, DELAY));
}

function jsonFailStub () {
  return new Promise((__, reject) => {
    setTimeout(() => reject(new Error("Kaboom")), DELAY);
  });
}

module.exports = {
  success: jsonStub,
  fail: jsonFailStub,
};
