const { setDefaultTransport } = require("../src/transport");
const p = require("../src/PuppeteerTransport");

exports.mochaHooks = {
  beforeAll () {
    // setDefaultTransport(p.transport);
  },
  async afterAll () {
    // await p.closeTransport();
  },
};