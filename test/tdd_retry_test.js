var assert = require('chai').assert;

suite('tdd retry', function() {
  var x = 0;

  suiteSetup(function() {
    assert.operator(x++, '>', 0);
  });

  suiteTeardown(function() {
    assert.operator(x++, '>', 4);
  });

  setup(function() {
    assert.operator(x++, '>', 1);
  });

  teardown(function() {
    assert.operator(x++, '>', 3);
  });

  test('should eventually pass', function() {
    assert.operator(x++, '>', 2);
  });
});
