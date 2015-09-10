"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function buildPlayers(_players) {
  var players = [].concat(_toConsumableArray(_players));

  players.forEach(function (player) {
    player.fullName = player.firstName + (player.lastName ? " " + player.lastName : "");
    player.downcaseName = player.fullName.toLowerCase();
  });

  return players;
}

module.exports = buildPlayers;