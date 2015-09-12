const async = require("async");
const {EventEmitter} = require("events");
const {Readable} = require("stream");

let transport = require("../../get-json");

const BATCH_COUNT = 10;
const GAME_URL = "http://stats.nba.com/stats/locations_getmoments/";

let not = fn => (...args) => !fn(...args);
let id = x => x;

function getPlayMovement (playNumber, gameId, cb) {
  transport(GAME_URL, {eventid: playNumber, gameid: gameId}, cb);
}

const movement = Object.create({
  setTransport (_transport) {
    transport = _transport;
  },
});

function getPlayMovementForGame (gameId) {
  const emitter = new EventEmitter();

  let i = 1;
  let blanks = 0;
  let ended = false;

  const MAX = 10;

  while (i < MAX) {
    sendRequest(i);
    i += 1;
  }

  function sendRequest (n) {
    if (ended) return;

    if (blanks > MAX) {
      ended = true;
      return emitter.emit("end");
    }

    getPlayMovement(i, gameId, (err, data) => {
      if (err) {
        return emitter.emit("error", err);
      }

      if (ended) {
        return;
      }

      if (data) {
        blanks = 0;
        emitter.emit("data", data);
      } else {
        blanks += 1;
      }

      sendRequest(++i);
    });
  }

  return emitter;
}


function streamPlayMovementForGame (gameId) {
  return streamifyEmitter(getPlayMovementForGame(gameId));
}

function between (x, y) {
  var nums = [];
  for (; x < y; x++) nums.push(x);
  return nums;
}

function streamifyEmitter (emitter) {
  let items = [];
  let rs = new Readable();
  rs._read = () => {
    while (items.length) {
      if (!rs.push(items.shift())) {
        break;
      }
    }
  };

  emitter.on("data", [].push.bind(items));
  emitter.on("end", [].push.bind(items, null));

  return rs;
}


movement.getPlayMovement = getPlayMovement;
movement.getPlayMovementForGame = getPlayMovementForGame;
movement.streamPlayMovementForGame = streamPlayMovementForGame;
module.exports = movement;
