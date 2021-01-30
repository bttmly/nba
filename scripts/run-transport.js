const { NBA_URL, TRANSPORT = "basic" } = process.env;
const { defaultTransport, setDefaultTransport } = require("../src/transport");
const { transport: puppeteerTransport } = require("../src/PuppeteerTransport");
const { URL } = require("url");
const transforms = require("../src/transforms");

if (!NBA_URL) throw new Error("must provide NBA_URL");

(async () => {
  if (TRANSPORT !== "basic") {
    setDefaultTransport(puppeteerTransport);
  }


  let url = new URL(NBA_URL).toString();
  url = url.split("\\").join("");
  const result = await defaultTransport(url);
  console.log(transforms.general(result));
  // console.log(JSON.stringify(result));
})();
