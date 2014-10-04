
describe('setting up an inbound payment to ripple from coinbase', function() {

  it('should return an invoice url and invoice id', function(done) {
    http
      .post('/bridge/payments')
      .send({
        destination_address: 'ripple:stevenzeiler',
        amount: 5,
        currency: 'USD'
      })
      .end(function(error, response) {
        assert.strictEqual(response.code, 201); // created
        assert.strictEqual(response.payments, [{
          invoice_id: 'o8u234j89203j0f2hfhfh',
          invoice_url: 'https://api.coinbase.com/orders/o8u234j89203j0f2hfhfh',
          source_amount: 0.002,
          source_currency: 'BTC',
          destination_address: 'ripple:r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
          destination_amount: 0.002,
          destination_currency: 'BTC'
        }]);
      });
  });

  describe('a ripple destination with no trust line path', function() {
    it('should respond with the required ripple trust line', function(done) {
      http
        .post('/bridge/payments')
        .send({
          destination_address: 'ripple:rJ9tLxxureMB7psVxWsC9gCTUjqYqDwfCV'
          amount: 5,
          currency: 'USD'
        })
        .end(function(error, response) {
          assert.strictEqual(response.code, 200);
          assert.strictEqual(response.required, {
            RippleTrustLine: {
              account: 'rJ9tLxxureMB7psVxWsC9gCTUjqYqDwfCV',
              counterparty: 'rLtys1YJHGj8oTpECWSzDv77YRGDWGduUX',
              currency: 'BTC',
              amount: 0.002
            }
          });
          done();
        });
    });
  });
});

