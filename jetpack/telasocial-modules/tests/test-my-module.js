var myModule = require("my-module");

exports.ensureAdditionWorks = function(test) {
  test.assertEqual(myModule.add(1, 1), 2, "1 + 1 = 2");
};

