const Promise = require('bluebird');
const http = Promise.promisifyAll(require('superagent'));

module.exports = {

  sendMoney: function(options) {
    return new Promise(function(resolve, reject) {
      if (!options.to) {
        reject(new Error('InvalidToAddress'));
      }
      if (!options.amount) {
        reject(new Error('InvalidAmount'));
      }
      var url = 'https://coinbase.com/api/v1/transactions/send_money';
      http
        .post(url)
        .send(options)
        .endAysnc().then(resolve).error(reject);
    });
  },

  show: function(options) {
    return new Promise(function(resolve, reject) {
      if (!options.id) {
        reject(new Error('InvalidTransactionId'));
      }
      http
        .get('https://coinbase.com/api/v1/transactions/'+options.id)
        .endAysnc().then(resolve).error(reject);
    })
  },

  list: function(options) {
    var _this = this;
    var url = 'https://coinbase.com/api/v1/transactions';
    var headers = _this.requestService.generateHeaders(url, options);
    return new Promise(function(resolve, reject) {
      http
        .get(url)
        .set(headers)
        .endAsync().then(function(response) {
          resolve(response.body.transactions);
        })
        .error(reject);
    });
  }
};

