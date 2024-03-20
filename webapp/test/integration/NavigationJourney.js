sap.ui.define(
  [
    "sap/ui/test/opaQunit",
    "kate/vaitsiulevich/test/integration/pages/StoresOverview",
    "kate/vaitsiulevich/test/integration/arrangements/Startup",
  ],
  function (opaTest) {
    "use strict";

    QUnit.module("Navigation");

    opaTest("Should see the StoresOverview view", function (Given, When, Then) {
      // Arrangements
      Given.iStartMyApp();

      // Assertion
      Then.onTheStoresOverviewPage.iShouldSeeTheStoresOverview();

      // Cleanup
      Then.iTeardownMyApp();
    });
  }
);
