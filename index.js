const express = require('express');
const QuotesController = require(__dirname+'/lib/controllers/quotes_controller.js');
const PaymentsController = require(__dirname+'/lib/controllers/payments_controller.js');

function CoinbasePlugin(options) {
  var router = new express.Router();

  var quotesController = new QuotesController ({
    gatewayd: options.gatewayd
  });
  var PaymentsController = new PaymentsController ({
    gatewayd: options.gatewayd
  });

  router.get('/v1', function(request, response) {
    response.send({
      success: true,
      plugin: {
        name: 'gatewayd-coinbase',
        version: '0.1.0',
        documentation: 'https://github.com/gatewayd/coinbase-plugin'
      }
    })
  });
  router.get('/v1/payments/quotes', quotesController.test.bind(quotesController));
  router.post('/bridge/payments', paymentsController.create.bind(paymentsController));

  this.router = router;
  this.processes = {
    coinbase_outgoing : __dirname+'/processes/coinbase_outgoing.js'
  };

}

module.exports = CoinbasePlugin;
