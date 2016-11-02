/*
stats always end up with a thing like:
{
  [someKeyName]: [ ... relevant results ... ]
}
*/

function unnest (obj) {
  const keys = Object.keys(obj);
  if (keys.length !== 1) {
    console.error("unnest() only works on objects with a single key");
    return obj;
  }

  const items = obj[keys[0]];
  if (!Array.isArray(items)) {
    console.error("unnest() expects the only key to reference an array");
    return obj;
  }

  return items;
}

module.exports = unnest;
