sap.ui.define(
  ["sap/ui/core/util/MockServer", "sap/base/Log"],
  function (MockServer, Log) {
    "use strict";

    return {
      /**
       * Initializes the mock server.
       * You can configure the delay with the URL parameter "serverDelay".
       * The local mock data in this folder is returned instead of the real data for testing.
       * @public
       */
      init() {
        const oMockServer = new MockServer({
          rootUri: "/",
        });

        oMockServer.simulate("../localService/metadata.xml", {
          sMockdataBaseUrl: "../localService/mockdata",
          bGenerateMissingMockData: true,
        });

        oMockServer.start();

        Log.info("Running the app with mock data");
      },
    };
  }
);
