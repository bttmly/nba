const async = require("async");
const {EventEmitter} = require("events");

const transport = require("../../get-json");

const movement = {};

const BATCH_COUNT = 10;
const GAME_URL = "http://stats.nba.com/stats/locations_getmoments/";

let not = fn => (...args) => !fn(...args);
let id = x => x;

function getPlayMovement (playNumber, gameId, cb) {
  transport(GAME_URL, {eventid: playNumber, gameid: gameId}, cb);
}

// this algorithm should be improved as follows:
// set an in flight size, issue those requests
// then as each one returns, send another
// at the same time, keep a count of consecutive falsy results
// if the count exceeds the flight size, terminate.

function getPlayMovementForGame (gameId, done) {
  const emitter = new EventEmitter();

  let i = 1;

  function repeat () {

    let nums = between(i, (i + BATCH_COUNT));
    i = i + BATCH_COUNT;

    console.log("NUMS", nums);
    async.map(nums, function (n, cb) {
      console.log("RUNNING", n);
      getPlayMovement(n, gameId, (err, data) => {
        if (err) return cb(err);

        // emitting this data needs to include the eventid because
        // the plays come back in slightly random order
        if (data) emitter.emit("data", data);

        // don't hang on to the objects here, just cast them to boolean
        // for the callback to check
        return cb(null, !!data);
      });
    }, function (err, results) {

      if (err) {
        return emitter.emit("error", err);
      }

      if (results.every(not(id))) {
        console.log("Terminating!");
        emitter.emit("end");
        return;
      }

      repeat();
    });
  }

  repeat();

  return emitter;
}

function between (x, y) {
  var nums = [];
  for (; x < y; x++) nums.push(x);
  return nums;
}

module.exports = {
  getPlayMovement,
  getPlayMovementForGame,
};

