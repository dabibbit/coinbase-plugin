const CoinbaseClient = require(__dirname + '/../lib/client.js');
const assert = require('assert');

const client = new CoinbaseClient({
  apiKey: process.env.COINBASE_API_KEY,
  secret: process.env.COINBASE_SECRET_KEY
});

describe('Coinbase Node Service', function () {

  it('should make a request to Coinbase and log out the response or error', function (done) {
    client.list()
      .then(function(transactions) {
        assert(transactions.length > 0);
        console.log(transactions);
        done();
      })
      .error(function(error) {
        console.log('ERROR', error);
        assert(false);
        done();
      });
  });

});
