const http = require("http");
const qs = require("qs");

const nba = require("..");

const statsHandler = createHandler("stats");
const synergyHandler = createHandler("synergy");
const sportVuHandler = createHandler("sportVu");

const server = http.createServer(async (req, res) => {

  let [ path, query ] = req.url.split("?");
  path = path.split("/").filter(Boolean);
  query = qs.parse(query);

  console.log("req.url:", path, query);

  const namespace = path.shift();
  const method = path.shift();

  try {
    switch (namespace) {
      case "stats":
        return await statsHandler(res, method, query);
      case "synergy":
        return await synergyHandler(res, method, query);
      case "sportvu":
      case "sportVu":
        return await sportVuHandler(res, method, query);
      default: {
        res.writeHead(400);
        res.end(`Invalid namespace: ${namespace}`);
        return;
      }
    }
  } catch (e) {
    if (/Bad Request/.test(e)) {
      res.writeHead(400);
    } else {
      res.writeHead(500);
    }
    res.end(e.message);
  }
});

function createHandler (namespace) {
  return async function (res, method, query) {
    if (nba[namespace][method] == null) {
      res.writeHead(400);
      res.end(`Invalid ${namespace} method: ${method}`);
      return;
    }
    const result = await nba[namespace][method](query);
    res.writeHead(200);
    res.end(JSON.stringify(result));
  };
}

const port = process.env.PORT || 7799;

server.listen(port, () => {
  console.log("server listening on", port);
});

process.on("unhandledRejection", (err) => { throw err; });
