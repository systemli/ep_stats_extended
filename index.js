const API = require('ep_etherpad-lite/node/db/API')
const stats = require('ep_etherpad-lite/node/stats')

let pads = []

stats.gauge('totalPads', function () {
  API.listAllPads().then(allPads => {
    pads = allPads.padIDs
  })

  return pads.length
})

stats.gauge('pads', function () {
  return {
    'default': pads.filter(function (padID) {
      return typeof padID !== 'string' ? false : !padID.endsWith('-keep') && !padID.endsWith('-temp')
    }).length,
    'temp': pads.filter(function (padID) {
      return typeof padID !== 'string' ? false : padID.endsWith('-temp')
    }).length,
    'keep': pads.filter(function (padID) {
      return typeof padID !== 'string' ? false : padID.endsWith('-keep')
    }).length
  }
})

exports.registerRoute = function (hook_name, args, cb) {
  args.app.get('/stats', function (req, res) {
    res.json(stats.toJSON())
  })
}
