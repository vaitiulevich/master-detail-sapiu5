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
      Given.iStartMyApp();

      Then.onTheStoresOverviewPage.iShouldSeeTheStoresOverview();

      Then.iTeardownMyApp();
    });
  }
);
