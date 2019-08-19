'use strict';

/* eslint require-jsdoc: 0 */  // --> OFF

var myShipment = {
    default: true,
    shippingMethod: {
        ID: '001',
        custom: {
            storePickupEnabled: false
        }
    },
    custom: {
        fromStoreId: 'store1',
        shipmentType: ''
    },

    shippingAddress: {},
    setShippingMethod: function (shippingMethod) {
        this.shippingMethod = shippingMethod;
    },
    createShippingAddress: function () {
        this.shippingAddress = {
            firstName: 'Downtown TV Shop',
            lastName: '',
            address1: '333 Washington St',
            address2: '',
            city: 'Boston',
            postalCode: '01803',
            countryCode: { value: 'us' },
            phone: '333-333-3333',
            stateCode: 'MA',
            setFirstName: function (firstNameInput) { this.firstName = firstNameInput; },
            setLastName: function (lastNameInput) { this.lastName = lastNameInput; },
            setAddress1: function (address1Input) { this.address1 = address1Input; },
            setAddress2: function (address2Input) { this.address2 = address2Input; },
            setCity: function (cityInput) { this.city = cityInput; },
            setPostalCode: function (postalCodeInput) { this.postalCode = postalCodeInput; },
            setStateCode: function (stateCodeInput) { this.stateCode = stateCodeInput; },
            setCountryCode: function (countryCodeInput) { this.countryCode.value = countryCodeInput; },
            setPhone: function (phoneInput) { this.phone = phoneInput; }
        };
        return this.shippingAddress;
    }
};

function ShipmentModel() {
    var shipmentModel = myShipment;
    shipmentModel.createShippingAddress();
    return shipmentModel;
}

module.exports = ShipmentModel;
