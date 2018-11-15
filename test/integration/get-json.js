const getJson = require("../../src/get-json");
const Koa = require("koa");
const http = require("http");
const expect = require("expect");
const { getError } = require("../util");

describe("getJson", () => {

  let server;
  before((done) => {
    server = createServer();
    server.listen(3030, done);
  });

  after((done) => server.close(done));

  it("works with JSON successes", async () => {
    const data = await getJson("http://localhost:3030/json_success");
    expect(data).toEqual({ success: true });
  });

  it("works with JSON errors", async () => {
    const err = await getError(getJson("http://localhost:3030/json_failure"));
    expect(err.message).toBe("Request error – 400 Bad Request");
    expect(err.body).toEqual({ success: false });
    expect(err.status).toBe(400);
    testErrorProps(err);
  });

  it("errors with good message on non-JSON successes", async () => {
    const err = await getError(getJson("http://localhost:3030/html_success"));
    expect(err.message).toBe("Received non-JSON response with content type 'text/html'");
    expect(err.body).toBe(htmlResp(200));
    expect(err.status).toBe(200);
    testErrorProps(err);
  });

  it("errors with good message on non-JSON failures", async () => {
    const err = await getError(getJson("http://localhost:3030/html_failure"));
    expect(err.message).toBe("Received non-JSON response with content type 'text/html'");
    expect(err.body).toBe(htmlResp(400));
    expect(err.status).toBe(400);
    testErrorProps(err);
  });
});

function testErrorProps (err) {
  expect(typeof err.status).toBe("number");
  expect(err.url).toContain("http://localhost");
  expect(err.body).toBeTruthy();
  expect(err.fetchOptions).toHaveProperty("headers");
}

function createServer () {
  const app = new Koa();
  app.use(async (ctx, next) => {
    switch (ctx.path) {
      case "/json_success":
        ctx.status = 200;
        ctx.body = { success: true };
        return;

      case "/json_failure":
        ctx.status = 400;
        ctx.body = { success: false };
        return;

      case "/html_success":
        ctx.type = "text/html";
        ctx.status = 200;
        ctx.body = htmlResp(200);
        return;

      case "/html_failure":
        ctx.type = "text/html";
        ctx.status = 400;
        ctx.body = htmlResp(400);
        return;

      default: break;
    }

    return next();
  });

  return http.createServer(app.callback());
}

const htmlResp = (status) => `
<!DOCTYPE html>
<html>
  <head>
    <title>${status} - ${http.STATUS_CODES[status]}</title>
  </head>
  <body>
    <h1>${status} - ${http.STATUS_CODES[status]}</h1>
  </body>
</html>
`.trim();

