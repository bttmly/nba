const fs = require("fs");
const path = require("path");

const respDir = path.join(__dirname, "./responses");

module.exports = class ResponseRecorder {
  constructor (namespace) {
    this.namespace = namespace;
    this.data = {};
    this.running = Boolean(process.env.WRITE_RESPONSES);
    // console.log(`ResponseRecorder::${namespace}: ${this.running} INIT`);
  }

  record (method, data) {
    if (!this.running) return;
    this.data[method] = data;
  }

  write () {
    const { running, namespace } = this;
    // console.log(`ResponseRecorder::${namespace}: ${running} WRITE`);
    if (!running) return;
    try {
      fs.mkdirSync(respDir);
    } catch (err) {}

    for (const [method, response] of Object.entries(this.data)) {
      // console.log("WRITE:", namespace, method);
      fs.writeFileSync(
        path.join(respDir, `${namespace}_${method}.json`),
        JSON.stringify(response, null, 2),
      );
    }
  }
};