const parse = require("minimist");
const get = require("lodash.get");
const nba = require("./");

run(parse(process.argv.slice(2)));

function run (args) {
  // console.log(args);

  if (args.ls) {
    console.log("available methods:");
    ["stats", "sportVu", "synergy"].forEach(function (namespace) {
      Object.keys(nba[namespace]).forEach(function (method) {
        if (method === "withTransport") return;
        console.log(`${namespace}.${method}`);
      });
    });
    return;
  }

  const {method} = args;
  if (!method) throw new Error("Need a `method`");

  const fn = get(nba, method);

  if (fn == null) throw new Error(`No function at ${method}`);

  if (args.docs) {
    if (fn.defaults) {
      console.log(`${method} default parameters:`);
      Object.keys(fn.defaults).forEach(key => {
        console.log(`• ${key}: ${fn.defaults[key]}`);
      });
    }
    return;
  }

  delete args._;
  delete args.method;

  fn(args).then(obj => {
    console.log(JSON.stringify(obj));
  });
}
