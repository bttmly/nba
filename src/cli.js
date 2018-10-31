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
      console.log(`${method} parameters and default values:`);
      for (const [ key, value ] of Object.entries(fn.defaults)) {
        console.log(`• ${key}: ${JSON.stringify(value)}`);
      }
    } else {
      console.log(`No docs found for ${method} – open an issue or a pull request: https://github.com/bttmly/nba`);
    }
    return;
  }

  delete args._;
  delete args.method;

  fn(args).then(obj => {
    console.log(JSON.stringify(obj));
  });
}
