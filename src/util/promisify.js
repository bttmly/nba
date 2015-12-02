const pify = require("pify");

const promisify = Prms => func => pify(func, Prms);
const promisifyAll = Prms => obj => pify(obj, Prms);

module.exports = {promisify, promisifyAll};

