var RetryTest = require('./node_modules/mocha-retry/retryTest');
var retrySuite = require('./node_modules/mocha-retry/retrySuite');

module.exports = function createInterface(Mocha) {
  var Suite = Mocha.Suite;

  // Decorates Mocha.Suite with mocha-retry functions... holy ****.
  retrySuite(Mocha);

  return function(suite) {
    var suites = [suite];

    suite.on('pre-require', function(context, file) {
      context.setup = function(name, fn) {
        suites[0].beforeEachWithRetry(2, name, fn);
      };

      context.teardown = function(name, fn) {
        suites[0].afterEachWithRetry(2, name, fn);
      };

      context.suiteSetup = function(name, fn) {
        suites[0].beforeAllWithRetry(2, name, fn);
      };

      context.suiteTeardown = function(name, fn) {
        suites[0].afterAllWithRetry(2, name, fn);
      };

      context.suite = function(title, fn) {
        var suite = Suite.create(suites[0], title);
        suite.times = 2;
        suite.file = file;
        suites.unshift(suite);
        fn.call(suite);
        suites.shift();
        return suite;
      };

      context.test = function(title, fn) {
        var test = new RetryTest(2, title, fn);
        test.file = file;
        suites[0].addTest(test);
        return test;
      };
    });
  };
};
