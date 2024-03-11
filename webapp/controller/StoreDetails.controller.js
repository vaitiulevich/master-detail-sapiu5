sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, Sorter, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("kate.vaitsiulevich.controller.StoreDetails", {
      /**
       * Controller's "init" lifecycle method.
       *
       * @public
       */
      onInit() {
        const oComponent = this.getOwnerComponent();
        const oRouter = oComponent.getRouter();
        oRouter
          .getRoute("StoreDetails")
          .attachPatternMatched(this.onPatternMatched, this);
      },
      /**
       * "StoreDetails" route pattern matched event handler.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onPatternMatched(oEvent) {
        const that = this;
        const mRouteArguments = oEvent.getParameter("arguments");
        const sStoreID = mRouteArguments.StoreID;
        const oODataModel = this.getView().getModel();

        oODataModel.metadataLoaded().then(() => {
          const sKey = "/Stores(" + sStoreID + ")";
          that.getView().bindObject({ path: sKey });
        });
      },
      /**
       * Open selection store page event handler.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onPressSellectionProductBtn(oEvent) {
        const sStoreId = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("StoreID");
        const sProductId = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("ProductId");

        const oComponent = this.getOwnerComponent();

        oComponent.getRouter().navTo("ProductDetails", {
          StoreID: sStoreId,
          ProductID: sProductId,
        });
      },
      /**
       * Close Store Detail page.
       *
       * @public
       *
       */
      onPressClosePageBtn() {
        const oComponent = this.getOwnerComponent();
        oComponent.getRouter().navTo("StoresOverview");
      },
      /**
       * Sort product table by price.
       *
       * @public
       *
       */
      onPressSortPriceTableBtn() {
        this._bDescendingSort = !this._bDescendingSort;
        const oView = this.getView(),
          oTable = oView.byId("productsTable"),
          oBinding = oTable.getBinding("items"),
          oSorter = new Sorter("Price", this._bDescendingSort);

        oBinding.sort(oSorter);
      },
      /**
       * Searching product.
       *
       * @param {sap.ui.base.Event} oEvent event object.
       *
       * @public
       *
       */
      onSearchProduct(oEvent) {
        let oTableSearchState = [],
          sQuery = oEvent.getParameter("query");

        if (sQuery && sQuery.length > 0) {
          oTableSearchState = [
            new Filter("ProductName", FilterOperator.Contains, sQuery),
          ];
        }

        this.getView()
          .byId("productsTable")
          .getBinding("items")
          .filter(oTableSearchState, "Application");
      },
    });
  }
);
