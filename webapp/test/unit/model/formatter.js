sap.ui.define(["../../../model/formatter"], function (formatter) {
  "use strict";

  QUnit.module("Number unit");
  QUnit.module("Price State");

  function priceStateTestCase(oOptions) {
    const sState = formatter.priceState(oOptions.price);

    oOptions.assert.strictEqual(
      sState,
      oOptions.expected,
      "The price state was correct"
    );
  }

  QUnit.test(
    "Should format the products with a price lower than 100 to Success",
    function (assert) {
      priceStateTestCase.call(this, {
        assert: assert,
        price: 42,
        expected: "Success",
      });
    }
  );

  QUnit.test(
    "Should format the products with a price of 100 to Normal",
    function (assert) {
      priceStateTestCase.call(this, {
        assert: assert,
        price: 100,
        expected: "None",
      });
    }
  );

  QUnit.test(
    "Should format the products with a price between 100 and 150 to Normal",
    function (assert) {
      priceStateTestCase.call(this, {
        assert: assert,
        price: 112,
        expected: "None",
      });
    }
  );

  QUnit.test(
    "Should format the products with a price between 150 and 200 to Warning",
    function (assert) {
      priceStateTestCase.call(this, {
        assert: assert,
        price: 198,
        expected: "Warning",
      });
    }
  );

  QUnit.test(
    "Should format the products with a price higher than 200 to Error",
    function (assert) {
      priceStateTestCase.call(this, {
        assert: assert,
        price: 201,
        expected: "Warning",
      });
    }
  );
});
