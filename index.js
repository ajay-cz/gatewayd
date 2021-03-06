var config = require(__dirname + '/config/config.js');
var data   = require(__dirname +'/lib/data/');
var ripple = require(__dirname +'/lib/ripple/');

/** @module Api */
var api = require('require-all-to-camel')(__dirname+'/lib/api/');

module.exports = {
  config: config,
  ripple: ripple,
  data: data,
  api: api
}; 

