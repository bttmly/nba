module.exports = function blank (obj) {
  const out = Object.create(null);
  if (obj) {
    Object.keys(obj).forEach(key => {
      out[key] = obj[key];
    });
  }
  return out;
};