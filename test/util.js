async function getError (p) {
  try {
    await p;
  } catch (err) {
    return err;
  }
  throw new Error("Expected to reject but fulfilled");
};

module.exports = { getError };