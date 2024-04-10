sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/f/library",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
  ],
  (UIComponent, JSONModel, library, FlexibleColumnLayoutSemanticHelper) => {
    "use strict";
    const LayoutType = library.LayoutType;

    return UIComponent.extend("kate.vaitsiulevich.Component", {
      metadata: {
        manifest: "json",
      },
      /**
       * Component's "init" lifecycle method.
       *
       * @public
       */
      init() {
        UIComponent.prototype.init.apply(this, arguments);

        const oModel = new JSONModel();
        this.setModel(oModel, "AppLayout");

        this.getRouter().initialize();
      },
      /**
       * Returns an instance of the semantic helper
       * @returns {sap.f.FlexibleColumnLayoutSemanticHelper} An instance of the semantic helper
       */
      getHelper() {
        const oFCL = this.getRootControl().byId("RootApp"),
          oParams = new URLSearchParams(window.location.search),
          oSettings = {
            defaultOneColumnLayoutType: LayoutType.OneColumn,
            defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
            defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
            initialColumnsCount: 2,
            maxColumnsCount: oParams.get("max"),
          };

        return FlexibleColumnLayoutSemanticHelper.getInstanceFor(
          oFCL,
          oSettings
        );
      },
    });
  }
);
