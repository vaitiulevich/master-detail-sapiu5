sap.ui.define([], () => {
  "use strict";

  return {
    /**
     * Defines a value state based on the price
     *
     * @public
     * @param {number} iPrice the price of a post
     * @returns {string} sValue the state for the price
     */
    priceState(iPrice) {
      const oResourceBundle = this.getOwnerComponent()
        .getModel("i18n")
        .getResourceBundle();
      if (iPrice < 100) {
        return oResourceBundle.getText("StatusSuccess");
      } else if (iPrice >= 100 && iPrice < 150) {
        return oResourceBundle.getText("StatusNone");
      } else {
        return oResourceBundle.getText("StatusWarning");
      }
    },
  };
});
