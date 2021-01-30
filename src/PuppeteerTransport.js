const puppeteer = require("puppeteer");
const { URL } = require("url");

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";

const delay = (ms) => new Promise(r => setTimeout(r, ms));

class PuppeteerTransport {
  static async create () {
    const browser = await puppeteer.launch({
      handleSIGINT: false,
      handleSIGTERM: false,
      args: [
        "--disable-web-security",
      ],
    });
    return new PuppeteerTransport(browser);
  }

  constructor (browser) {
    this.browser = browser;
  }

  async _createPage () {
    const page = await this.browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", req => {
      const type = req.resourceType();
      switch (type) {
        case "document":
        case "fetch":
          req.continue();
          break;
        default:
          req.abort();
      }
    });
    page.on("framenavigated", (frame) => {
      console.log("NAVIGATION:", frame.url(), "main", frame === page.mainFrame());
    });
    await page.setUserAgent(USER_AGENT);
    await page.goto("https://www.nba.com/stats/", { waitUntil: "domcontentloaded", timeout: 8 * 1000 });
    return page;
  }

  async _getPage () {
    if (this.pageP) {
      return this.pageP;
    }
    this.pageP = this._createPage();
    return this.pageP;
  }

  async run (_url) {
    const page = await this._getPage();
    const result = await page.evaluate(async (url) => {
      const headers = {
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en,en-US;q=0.9",
        Accept: "application/json, text/plain, */*",
        Referer: "https://www.nba.com/",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
        Origin: "http://www.nba.com",
        // "x-nba-stats-origin": "stats",
        // "x-nba-stats-token": "true",
      };

      try {
        const res = await fetch(url, { headers });
        if (res.ok) {
          const data = await res.json();
          return { data, ok: true };
        }
        const text = await res.text();
        return {
          ok: false,
          data: { text, status: res.status },
        };
      } catch (err) {
        console.log(err);
        return { ok: false, data: { text: err.toString() }};
      }
    }, _url);
    return result;
  }

  close () {
    console.trace("browser close");
    return this.browser.close();
  }
};

let instanceP = null;

async function transport (baseURL, query = {}) {
  if (instanceP == null) {
    instanceP = PuppeteerTransport.create();
    await delay(1);
  }
  const instance = await instanceP;

  const u = new URL(baseURL);
  for (const [key, value] of Object.entries(query)) {
    u.searchParams.append(key, value);
  }
  u.protocol = "https:";
  const result = await instance.run(u.toString());
  if (result.ok) return result.data;
  throw new Error(`${result.data.text} – ${u.toString()}`);
}

module.exports.transport = transport;
module.exports.closeTransport = async () => {
  if (instanceP == null) return;
  const instance = await instanceP;
  await instance.browser.close();
};
module.exports.PuppeteerTransport = PuppeteerTransport;

// (async () => {
//   const urls = [
//     "https://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Advanced&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2020-21&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=",
//     "http://stats.nba.com/stats/playerprofilev2?LeagueID=00&PerMode=PerGame&PlayerID=201939&Season=2017-18",
//   ];

//   const b = await puppeteer.launch({
//     args: [
//       "--disable-web-security",
//     ],
//   });
//   const p = new PuppeteerTransport(b);
//   for (const u of urls) {
//     const { ok, data } = await p.run(u);
//     console.log(ok, data.text, u.split("?")[0]);
//   }
//   await p.close();
// })();