var depositCallbackJob = require(__dirname+'/../jobs/deposit_completion_callback.js');
var OutgoingPayment = require(__dirname+'/outgoing_payment.js');
var gateway = require(__dirname+'/../../');
var RippleRestClient = require('ripple-rest-client');

function OutgoingPaymentProcessor(payment) {
  this.outgoingPayment = new OutgoingPayment(payment);
}

OutgoingPaymentProcessor.prototype = {
  processOutgoingPayment: function(callback) {
    var self = this;
    self.outgoingPayment.processOutgoingPayment(function(error, record) {
      if (error) {
        console.log('payments:outgoing:error', error);
        depositCallbackJob.perform([record.id], console.log);
        setTimeout(callback, 2000);
      } else {
        depositCallbackJob.perform([record.id], console.log);
        callback();
      }
    });
  }
};

var rippleRestClient = new RippleRestClient({
  account: gateway.config.get('HOT_WALLET').address,
  secret: ''
})

module.exports = OutgoingPaymentProcessor;

