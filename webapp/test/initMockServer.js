sap.ui.define(
  ["kate/vaitsiulevich/localService/mockserver"],
  function (mockserver) {
    "use strict";
    mockserver.init();
    sap.ui.require(["sap/ui/core/ComponentSupport"]);
  }
);
