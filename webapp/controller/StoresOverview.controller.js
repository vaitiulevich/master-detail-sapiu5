sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/ObjectListItem",
    "sap/m/ObjectAttribute",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, ObjectListItem, ObjectAttribute, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("kate.vaitsiulevich.controller.StoresOverview", {
      /**
       * Searching store.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onSearchStore(oEvent) {
        let aFilters = [];
        const sQuery = oEvent.getSource().getValue();
        if (sQuery && sQuery.length > 0) {
          aFilters = new Filter({
            filters: [
              new Filter("Title", FilterOperator.Contains, sQuery),
              new Filter("Description", FilterOperator.Contains, sQuery),
            ],
            and: false,
          });
        }
        const oList = this.byId("listStores");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilters, "Application");
      },
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
