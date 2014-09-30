var CoinbaseClient = require(__dirname + '/../lib/client.js');

var client = new CoinbaseClient({
  apiKey: process.env.COINBASE_API_KEY,
  secret: process.env.COINBASE_SECRET_KEY
});

describe('Coinbase Node Service', function () {

  it('should make a request to Coinbase and log out the response or error', function () {
    client.list()
      .then(function(response) {
        console.log(response);
      })
      .error(function(error) {
        console.log(error);
      });
  });

});
