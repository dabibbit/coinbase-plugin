var CoinbasePlugin = require('coinbase-plugin');

module.exports = function(gatewayd) {

  var coinbasePlugin = new CoinbasePlugin({
    gatewayd: gatewayd,
    apiKey: '',
    secret: ''
  });

  gatewayd.processes.add(coinbasePlugin.processes.outgoing);
  gatewayd.server.use('/coinbase', coinbasePlugin.router);

};
