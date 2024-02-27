sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/ObjectListItem",
    "sap/m/ObjectAttribute",
  ],
  (Controller, ObjectListItem, ObjectAttribute) => {
    "use strict";

    return Controller.extend("kate.vaitsiulevich.controller.StoresOverview", {
      /**
       * Controller's "init" lifecycle method.
       *
       * @public
       */
      onInit() {},
      /**
       * Open selection store page event handler.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onSelectionChange(oEvent) {
        const sStoreId = oEvent
          .getSource()
          .getSelectedItem()
          .getBindingContext()
          .getProperty("StoreID");

        const oComponent = this.getOwnerComponent();

        oComponent.getRouter().navTo("StoreDetails", {
          StoreID: sStoreId,
        });
      },
      /**
       * Filter Stores List.
       *
       * @public
       */
      onPressFilterStoreBtn() {
        const oList = this.byId("list");
        oList.bindItems({
          path: "/Stores",
          parameters: {
            custom: {
              first: "3",
              storeid: "2",
            },
          },
          template: new ObjectListItem({
            title: "{Title}",
            number: {
              path: "EventDate",
              type: "sap.ui.model.type.DateTime",
              formatOptions: {
                style: "medium",
              },
            },
            numberUnit: this.oResourceBundle.getText("numberUnit"),
            attributes: [
              new ObjectAttribute({
                text: "{Description}",
              }),
            ],
          }),
        });
      },
    });
  }
);
