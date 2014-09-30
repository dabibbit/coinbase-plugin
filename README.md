coinbase-plugin
===============

Bridge from Ripple to email or bitcoin addresses via Coinbase.

### USAGE

In Gatewaydfile:

    const GatewaydCoinbase = require('gatewayd-coinbase');
  
    module.exports = function(gatewayd, next) {
      var plugin = new GatewaydCoinbase({
        gatewayd: gatewayd,
        apiKey: '',
        secret: ''
      });
      gatewayd.processes.add(plugin.processes.outgoing);
      // gatewayd.server.use('/coinbase', plugin.router);
    }

