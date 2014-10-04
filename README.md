coinbase-plugin

Bridge from Ripple to email or bitcoin addresses via Coinbase.

### Installation

In your gatewayd node.js project

  npm install --save gatewayd-coinbase

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

#### Send Payments with Coinbase

The process `send-payments-with-coinbase.js`, reads payments from the
gatewayd external transactions queue destined for coinbase
account email addresses or bitcoin addresses and sends them
signed using the Coinbase api, key and secret.

To run the `send-with-coinbase.js` process alone execute:

    export GATEWAYD_PATH=/path/to/gatewayd/
    node processes/send-payments-with-coinbase.js

Beind the scenes `send-payments-with-coinbase.js` polls the database
continually for transactions with external accounts where the `status`
is `outgoing`


#### Receive Payments via Coinbase

Payments made via Coinbase to a Ripple destination can be performed
by registering an at Coinbase. Using the `button` and `order` resources
with the Coinbase REST api Gatewayd can programatically create
payment invoice pages with urls for clients to send bitcoin.

    https://coinbase.com/api/doc/1.0/buttons/create.html

    POST https://api.coinbase.com/v1/buttons

Gatewayd can map a button to a ripple address destination, creating
a permanant bridge.

Once a bridge is established payments can be made by creating orders
for a given coinbase button:

    https://coinbase.com/api/doc/1.0/buttons/create_order.html

    POST /api/v1/buttons/:code/create_order

When the order is fulfilled by receiving the requisite bitcoin amount
a POST callback will be sent to the gatewayd server from Coinbase,
ultimately triggering the corresponding ripple payment.

