var SqlMqWorker = require('sql-mq-worker');
var gatewayd = require(process.env.GATEWAYD_PATH);

const ExternalAccounts = gatewayd.models.externalAccounts;
const CoinbaseClient = require('coinbase-node');

var coinbase = new CoinbaseClient({
  apiKey: gatewayd.config.get('COINBASE_API_KEY'),
  secret: gatewayd.config.get('COINBASE_SECRET_KEY')
});

var worker = new SqlMqWorker({
  Class: gatewayd.models.externalTransactions,
  predicate: { where: {
    status: 'outgoing'
  }},
  job: function(payment, next) {

    ExternalAccounts.find(payment.external_account_id)
    .then(function(account) {
      if (!account) {
        throw new Error("no external account found for payment");
      }
      coinbase.sendMoney({
          transaction: {
            to: account.address,
            amount_string: payment.amount,
            amount_currency_iso: payment.currency
          }
        })
        .then(function(coinbaseResponse) {
          payment.updateAttributes({
            status: 'successful',
            uid: coinbaseResponse.transaction.id,
            data: coinbaseResponse
          }).complete(next);
        })
        .error(function(error) {
          console.log('ERROR', error);
          payment.updateAttributes({
            status: 'failed',
            data: error
          }).complete(next);
        })
    })
  }
});
worker.start();

