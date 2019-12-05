const https = require('https');

function httpsRequest() {
    return new Promise(function (resolve, reject) {
        var req = https.get('https://stats.nba.com/js/data/ptsd/stats_ptsd.js', (resp) => {
            var data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(data);
            });

        });

        // reject on request error
        req.on('error', function (err) {
            reject(err);
        });

        // IMPORTANT
        req.end();
    });
}

module.exports = httpsRequest;
