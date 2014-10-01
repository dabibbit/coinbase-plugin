var CoinbasePlugin = require('coinbase-plugin');

module.exports = function(gatewayd) {

  var coinbasePlugin = new CoinbasePlugin({
    gatewayd: gatewayd
  });

  gatewayd.processes.add(coinbasePlugin.processes.outgoing);

};
