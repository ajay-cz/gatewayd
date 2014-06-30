var gateway = require(__dirname+'/../../');
var assert = require('assert');

describe('Get trust lines', function() {
  it('\nbetween hot wallet and cold wallet', function(done){

    gateway.api.getTrustLines(function(error, response){
      console.log('err::',error);
      console.log('res::',response);
      done();
    });
  });
});
