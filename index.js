var API = require('ep_etherpad-lite/node/db/API');
var stats = require('ep_etherpad-lite/node/stats');
var padsCount = stats.counter('pads', {count: padCount().length});

exports.registerRoute = function (hook_name, args, cb) {
    args.app.get('/stats_extended', function (req, res) {
        res.json(stats.toJSON());
    });
};

exports.padCreate = function (hook_name, context, cb) {
    var pad = context.pad;
    if (pad.head === 0) {
        padsCount.inc(1);
    }
};

exports.padRemove = function (hook_name, context, cb) {
    padsCount.dec(1);
};

function padCount() {
    var pads = [];

    API.listAllPads(function (err, data) {
        pads = data.padIDs;
    });

    return pads;
}
