const httpsRequest = require('./util/https-request');

function allTimePlayers() {
    return httpsRequest().then(function (body) {
        return JSON.parse(body.match(/{.*}/g)[0]).data.players.map(val => {
            var nameArr = val[1].split(',');
            var newNames = {};
            if (nameArr.length == 1) {
                // for example "Nene" hasn't fave a lastName
                newNames = { "firstName": nameArr[0], "lastName": "" };
            } else {
                // note that there could be more that one commas (e.g. "Hoffman, Bear, The Body")
                newNames = { "firstName": val[1].substring(nameArr[0].length + 2).trim(), "lastName": nameArr[0].trim() };
            }
            return {
                "playerId": val[0],
                "fullName": val[1],
                "activeBetween": [val[3], val[4]],
                ...newNames,
            }
        });
    });
}

function allTimeTeams() {
    return httpsRequest().then(function (body) {
        return JSON.parse(body.match(/{.*}/g)[0]).data.teams.map(val => {
            return {
                "teamId": val[0],
                "abbreviation": val[1],
                "simpleName": val[4],
                "location": val[3],
                "teamName": val[3] + ' ' + val[4],
            }
        });
    });
}

module.exports = { allTimePlayers, allTimeTeams };