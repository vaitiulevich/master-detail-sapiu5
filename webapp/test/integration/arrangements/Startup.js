sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
  "use strict";

  return Opa5.extend(
    "kate.vaitsiulevich.test.integration.arrangements.Startup",
    {
      /**
       * Initializes mock server, then starts the app component
       * @param {object} oOptionsParameter An object that contains the configuration for starting up the app
       * @param {integer} oOptionsParameter.delay A custom delay to start the app with
       * @param {string} [oOptionsParameter.hash] The in-app hash can also be passed separately for better readability in tests
       * @param {boolean} [oOptionsParameter.autoWait=true] Automatically wait for pending requests while the application is starting up
       */
      iStartMyApp: function (oOptionsParameter) {
        return this.iStartMyAppInAFrame("../mockServer.html");
      },
    }
  );
});
