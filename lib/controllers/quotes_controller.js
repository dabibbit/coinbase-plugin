function QuotesController (options) {
  this.quotesBuilder;
}

QuotesController.prototype = {
  test: function(request, response) {
    response.send({
      success: true
    });
  }
};

module.exports = QuotesController;