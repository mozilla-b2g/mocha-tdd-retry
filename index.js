var Mocha = module.parent.require('mocha');
var tddRetry = require('./tdd_retry');
module.exports = tddRetry(Mocha);
