sap.ui.require(
  [
    "sap/ui/test/Opa5",
    "kate/vaitsiulevich/test/integration/arrangements/Startup",
    "kate/vaitsiulevich/test/integration/WorklistJourney",
    "sap/ui/test/opaQunit",
  ],
  function (Opa5, Startup) {
    Opa5.extendConfig({
      autoWait: true,
      arrangements: new Startup(),
      viewNamespace: "kate.vaitsiulevich.view.",
    });
  }
);
