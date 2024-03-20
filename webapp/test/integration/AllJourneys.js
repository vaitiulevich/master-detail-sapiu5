sap.ui.require(
  [
    "sap/ui/test/Opa5",
    "kate/vaitsiulevich/test/integration/arrangements/Startup",
    "kate/vaitsiulevich/test/integration/WorklistJourney",
    // "kate/vaitsiulevich/test/integration/NavigationJourney",
    "sap/ui/test/opaQunit",
    // "kate/vaitsiulevich/test/integration/pages/StoresOverview",
    /* Pages */
    /* Journeys */
  ],
  function (Opa5, Startup) {
    Opa5.extendConfig({
      autoWait: true,
      arrangements: new Startup(),
      viewNamespace: "kate.vaitsiulevich.view.",
      /* Default settings */
    });
  }
);
