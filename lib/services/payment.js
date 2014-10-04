function PaymentService (options) {
}

PaymentService.prototype.setup = function setup(options) {
  return new Promise(function(resolve, reject) {
    ensureRipplePath.then(function() {
      return coinbase.createOrder({
        amount: options.amount,
        currency: 'BTC',
        custom: options.destination_amount
      }) 
    })
    .then(function(order) {
      return ExternalAccount.findOrCreate({
        name: 'CoinbaseMerchant'
      })
    })
    .then(function(account) {
      return ExternalTransaction.create({  
        external_account_id: account.id,
        amount: options.amount,
        currency: 'BTC',
        uid: order.id,
        status: 'invoice'
      })
    })
    .then(function(externalTransaction) {
      resolve({ 
        invoice_id: order.id,
        invoice_url: 'https://coinbase.com/orders/'+order.id,
        destination_address: options.destination_address,
        destination_amount: options.amount,
        destination_curreny: 'BTC',
        source_amount: options.amount,
        source_curreny: 'BTC'
      });
    })
    .error(reject);
  });
}

PaymentService.prototype._ensureRipplePath = function ensureRipplePath(options) {
  return new Promise(function(resolve, reject) {
    // default to true for now.
    resolve(true);
  });
}

module.exports = PaymentService;

