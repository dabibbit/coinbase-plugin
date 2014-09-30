var SqlMqWorker = require('sql-mq-worker');
var gatewayd = require(__dirname+'/../');
const Address = gatewayd.models.externalAccounts;

var worker = new SqlMqWorker({
  Class: gatewayd.models.externalTransactions,
  predicate: { where: {
    state: 'outgoing'
  }},
  job: function(payment, next) {

    Address.find(payment.external_account_id)
    .then(function(address) {
      if (!address) {
        throw new Error("no address found for payment"); 
      }
      return coinbase.sendMoney({
        to: address.uid,
        amount: payment.amount
      })
    })
    .then(function(coinbasePayment) {
      payment.updateAttributes({
        status: 'successful',
        uid: coinbasePayment.id
      }).then(next)
    })
    .error(function(error) {
      payment.data.error = error;
      payment.updateAttributes({
        status: 'failed',
        data: payment.data
      }) 
    })
  }
});

worker.start();

