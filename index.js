var API = require('ep_etherpad-lite/node/db/API');
var stats = require('ep_etherpad-lite/node/stats');

stats.gauge('totalPads', function () {
    return padCount().length;
});

exports.registerRoute = function (hook_name, args, cb) {
    args.app.get('/stats', function (req, res) {
        res.json(stats.toJSON());
    });
};

function padCount() {
    var pads = [];

    API.listAllPads(function (err, data) {
        pads = data.padIDs;
    });

    return pads;
}
