'use strict';

var productLineItemMock = {
    productListItem: null,
    productID: 'productId',
    UUID: 'someSpecialUUID',
    custom: {
        storeId: 'store2'
    },
    quantity: {
        value: 1
    },
    product: productMock
};
var availabilityModelMock = {
    inventoryRecord: {
        ATS: {
            value: 3
        }
    }
};
var productMock = {
    productId: 'productId',
    optionModel: {
        getOption: function () {},
        getOptionValue: function () {},
        setSelectedOptionValue: function () {}
    },
    availabilityModel: availabilityModelMock
};
var productListItemMock = {
    product: productMock,
    productID: 'productId',
    ID: 'productListItemID'
};

var createUUID = function () {
    return 'someUUID';
};

var getExistingProductLineItemInCartWithTheSameStore = {
    getExistingProductLineItemInCartWithTheSameStore: {
        getExistingProductLineItemsInCart: function () {
            return productLineItemMock;
        }
    }
};

var getProduct = function (productId) {
    return {
        productId: productId,
        optionModel: {
            getOption: function () {},
            getOptionValue: function () {},
            setSelectedOptionValue: function () {}
        },
        availabilityModel: availabilityModelMock
    };
};

var wrap = function () {
    return;
};

var msg = function () {
    return 'someString';
};

var msgf = function () {
    return 'someString';
};

var getProductList = function () {
    return {
        getItem: function () {
            return productListItemMock;
        },
        shippingAddress: {
            firstName: 'firstName',
            lastName: 'lastName',
            address1: 'address1',
            address2: 'address2',
            city: 'city',
            stateCode: 'stateCode',
            postalCode: 'postalCode',
            countryCode: 'countryCode',
            phone: 'phone'
        }
    };
};

var getOptions = function () {};

var getCurrentOptionModel = function () {
    return {
        optionId: 'option 1',
        selectedValueId: '123'
    };
};

var setStoreInProductLineItem = function (storeId, productLineItem) {
    return { storeId: storeId, productLineItem: productLineItem };
};

var enabledPlugins = function () {
    return ['something'];
};

var copyShippingAddressToShipment = function (shippingData, shipment) {
    var theShipment = shipment;
    var shippingAddress = theShipment.shippingAddress;
    shippingAddress.setFirstName(shippingData.address.firstName);
    shippingAddress.setLastName(shippingData.address.lastName);
    shippingAddress.setAddress1(shippingData.address.address1);
    shippingAddress.setAddress2(shippingData.address.address2);
    shippingAddress.setCity(shippingData.address.city);
    shippingAddress.setPostalCode(shippingData.address.postalCode);
    shippingAddress.setStateCode(shippingData.address.stateCode);
    shippingAddress.setCountryCode(shippingData.address.countryCode);
    shippingAddress.setPhone(shippingData.address.phone);
    theShipment.shippingMethod.ID = shippingData.shippingMethod;
};

var appendPluginPreferences = function () {
    return 'something';
};

module.exports = {
    getExistingProductLineItemInCartWithTheSameStore: getExistingProductLineItemInCartWithTheSameStore,
    getProduct: getProduct,
    createUUID: createUUID,
    wrap: wrap,
    msg: msg,
    msgf: msgf,
    getProductList: getProductList,
    getOptions: getOptions,
    getCurrentOptionModel: getCurrentOptionModel,
    setStoreInProductLineItem: setStoreInProductLineItem,
    enabledPlugins: enabledPlugins,
    appendPluginPreferences: appendPluginPreferences,
    copyShippingAddressToShipment: copyShippingAddressToShipment,
    availabilityModelMock: availabilityModelMock
};
