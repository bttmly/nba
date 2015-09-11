let promisify = Prms => func => (...args) => 
  new Prms((resolve, reject) => {
    func(...args, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

function promisifyAll (obj, Prms) {
  const _promisify = promisify(Prms);

  let out = Object.create(Object.getPrototypeOf(obj));
  Object.keys(obj).forEach(key => {
    out[key] = _promisify(obj[key]);
  });
  return out;
}

module.exports = {promisify, promisifyAll};

