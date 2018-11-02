async function getError (p) {
  try {
    await p;
    throw new Error("Expected to reject but fulfilled");
  } catch (err) {
    return err;
  }
};

module.exports = { getError };