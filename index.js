const API = require('ep_etherpad-lite/node/db/API')
const stats = require('ep_etherpad-lite/node/stats')

let pads = []

stats.gauge('totalPads', function () {
  API.listAllPads().then(allPads => {
    pads = allPads.padIDs
  })

  return pads.length
})

exports.registerRoute = function (hook_name, args, cb) {
  args.app.get('/stats', function (req, res) {
    res.json(stats.toJSON())
  })
}
