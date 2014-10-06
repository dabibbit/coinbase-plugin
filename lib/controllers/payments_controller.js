const PaymentService = require(__dirname+'/../services/payment.js');

function PaymentsController (options) {
  this.paymentService = new PaymentService(options);
}

QuotesController.prototype.setup = function setup(request, response) {
  
  this.paymentService.setup(request.body).then(function(payment) {
    response
      .status(200)
      .send(payment);
  })
  .error(function(error) {
    response
      .status(500)
      .send({ error: error })
  });
};

module.exports = QuotesController;
