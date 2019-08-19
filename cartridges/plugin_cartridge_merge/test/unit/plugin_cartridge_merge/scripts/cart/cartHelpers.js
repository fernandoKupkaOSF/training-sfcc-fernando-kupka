'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');
var mockSuperModule = require('../../../../mockModuleSuperModule.js');
var baseCartHelpersMock = require('../../../../../test/mocks/scripts/cart/baseCartHelpers.js');
var cartHelpers = require('../../../../mocks/helpers/cartHelpers');
var cartHelpers2 = require('../../../../mocks/helpers/cartHelpers2');
var ArrayList = require('../../../../mocks/dw.util.Collection.js');
var collections = require('../../../../mocks/util/collections');
var ShipmentModel = require('../../../../mocks/models/shipment');
var ProductLineItemModel = require('../../../../mocks/models/productLineItem/productLineItem');
var setQuantityValueStub = sinon.stub();
var createProductLineItemStub = sinon.stub();
var createUUIDStub = sinon.stub();
var copyCustomerAddressToShipmentSpy = sinon.spy();
var createShipmentSpy = sinon.spy();
var availabilityModelMock = {
    inventoryRecord: {
        ATS: {
            value: 3
        }
    }
};
var productListItemMock = {
    product: productMock,
    productID: 'productId',
    ID: 'productListItemID'
};
var productMock = {
    productId: 'productId',
    product: {
        availabilityModel: availabilityModelMock
    },
    optionModel: {
        getOption: function () {},
        getOptionValue: function () {},
        setSelectedOptionValue: function () {}
    },
    availabilityModel: availabilityModelMock
};
var productLineItemMock = {
    productListItem: null,
    productID: 'productId',
    UUID: 'someSpecialUUID',
    setQuantityValue: setQuantityValueStub,
    quantity: {
        value: 1
    },
    product: productMock
};
var emptyBasketMock = {
    createShipment: createShipmentSpy,
    createProductLineItem: createProductLineItemStub,
    defaultShipment: {
        productLineItems: new ArrayList([])
    },
    productLineItems: new ArrayList([])
};
var productLineItemsMock = new ArrayList([productLineItemMock]);
var currentBasketMock = {
    createShipment: createShipmentSpy,
    createProductLineItem: createProductLineItemStub,
    defaultShipment: {
        productLineItems: productLineItemsMock
    },
    productLineItems: productLineItemsMock
};
var mockOptions = [{
    optionId: 'option 1',
    selectedValueId: '123'
}];

var createApiBasket = function () {
    var shipment = new ShipmentModel();
    var shipments = [shipment];
    var currentBasket = {
        shipments: shipments,
        defaultShipment: shipment,
        productLineItems: [
            {
                custom: {
                    fromStoreId: 'store1'
                },
                quantity: {
                    value: '1'
                },
                productID: '000001',
                product: {
                    availabilityModel: {
                        inventoryRecord: {
                            ATS: {
                                value: '1'
                            }
                        }
                    }
                }
            },
            {
                custom: {
                    fromStoreId: 'store2'
                },
                quantity: {
                    value: '1'
                },
                productID: '000002',
                product: {
                    availabilityModel: {
                        inventoryRecord: {
                            ATS: {
                                value: '1'
                            }
                        }
                    }
                }
            }
        ],
        getShipments: function () {
            return this.shipments;
        },
        createShipment: function () {
            var newShipment = new ShipmentModel();
            this.shipments.push(newShipment);
            return newShipment;
        },
        createProductLineItem: function (product, optionModel, defaultShipment) {
            var newProductLineItem = new ProductLineItemModel(product, optionModel, defaultShipment);
            this.productLineItems.push(newProductLineItem);
            return newProductLineItem;
        },
        getBonusDiscountLineItems: new ArrayList([])
    };

    return currentBasket;
};

var createApiBasket2 = function () {
    var shipment = new ShipmentModel();
    var shipments = [shipment];
    var currentBasket = {
        shipments: shipments,
        defaultShipment: shipment,
        productLineItems: [
            {
                custom: {
                    fromStoreId: 'store1'
                },
                quantity: {
                    value: '1'
                },
                productID: '000001',
                product: {
                    availabilityModel: {
                        inventoryRecord: {
                            ATS: {
                                value: '1'
                            }
                        }
                    }
                }
            },
            {
                custom: {
                    fromStoreId: 'store2'
                },
                quantity: {
                    value: '1'
                },
                productID: '000002',
                product: {
                    availabilityModel: {
                        inventoryRecord: {
                            ATS: {
                                value: '1'
                            }
                        }
                    }
                }
            },
            {
                custom: {
                    fromStoreId: ''
                },
                quantity: {
                    value: '1'
                },
                productID: '000009',
                product: {
                    availabilityModel: {
                        inventoryRecord: {
                            ATS: {
                                value: '1'
                            }
                        }
                    }
                }
            }
        ],
        getShipments: function () {
            return this.shipments;
        },
        createShipment: function () {
            var newShipment = new ShipmentModel();
            this.shipments.push(newShipment);
            return newShipment;
        },
        createProductLineItem: function (product, optionModel, defaultShipment) {
            var newProductLineItem = new ProductLineItemModel(product, optionModel, defaultShipment);
            this.productLineItems.push(newProductLineItem);
            return newProductLineItem;
        },
        getBonusDiscountLineItems: new ArrayList([])
    };

    return currentBasket;
};

var requestMock = {
    session: {
        privacyCache: {
            set: function () {
                return 'something';
            }
        }
    }
};

describe('cartHelpers - BOPIS', function () {
    before(function () {
        mockSuperModule.create(baseCartHelpersMock);
    });
    after(function () {
        mockSuperModule.remove();
    });
    it('should create a prodcut line item and a new shipment with store address when add a product with a store', function () {
        var currentBasket = createApiBasket();
        cartHelpers.addProductToCart(currentBasket, '000001', 1, [], mockOptions, 'store1', requestMock);
        var currentShipment = collections.find(currentBasket.getShipments(), function (s) {
            return s.custom.fromStoreId === 'store1';
        });
        var currentProductLineItem = collections.find(currentBasket.productLineItems, function (pli) {
            return pli.custom.fromStoreId === 'store1';
        });
        assert.equal(currentShipment.custom.fromStoreId, 'store1');
        assert.equal(currentProductLineItem.custom.fromStoreId, 'store1');
        assert.equal(currentProductLineItem.quantity.value, 1);
        assert.equal(currentShipment.shippingMethod.ID, '001');
        assert.equal(currentShipment.shippingAddress.firstName, 'Downtown TV Shop');
        assert.equal(currentShipment.shippingAddress.address1, '333 Washington St');
        assert.equal(currentShipment.shippingAddress.city, 'Boston');
        assert.equal(currentShipment.shippingAddress.postalCode, '01803');
        assert.equal(currentShipment.shippingAddress.stateCode, 'MA');
        assert.equal(currentShipment.shippingAddress.countryCode.value, 'us');
        assert.equal(currentShipment.shippingAddress.phone, '333-333-3333');
    });

    it('should only add one product line item, a new shipment should not be created when add the same product with the same store twice', function () {
        var currentBasket = createApiBasket();
        cartHelpers.addProductToCart(currentBasket, '000001', 1, [], mockOptions, 'store1');
        var firstShipment = collections.find(currentBasket.getShipments(), function (s) {
            return s.custom.fromStoreId === 'store1';
        });
        var firstShipmentsCount = currentBasket.getShipments().length;
        cartHelpers.addProductToCart(currentBasket, '000001', 1, [], mockOptions, 'store1');
        var secondShipmentsCount = currentBasket.getShipments().length;
        var currentProductLineItem = collections.find(currentBasket.productLineItems, function (pli) {
            return pli.custom.fromStoreId === 'store1';
        });
        assert.equal(firstShipment.custom.fromStoreId, 'store1');
        assert.equal(firstShipmentsCount, secondShipmentsCount);
        assert.equal(firstShipment.custom.fromStoreId, 'store1');
        assert.equal(currentProductLineItem.productID, '000001');
    });

    it('should add two product line items and two new shipments when add the same product with a different store', function () {
        var currentBasket = createApiBasket();
        // add first BOPIS product to Cart
        cartHelpers.addProductToCart(currentBasket, '000001', 1, [], mockOptions, 'store1', requestMock);
        var firstShipment = collections.find(currentBasket.getShipments(), function (s) {
            return s.custom.fromStoreId === 'store1';
        });
        var firstProductLineItem = collections.find(currentBasket.productLineItems, function (pli) {
            return pli.custom.fromStoreId === 'store1';
        });
        assert.equal(firstShipment.custom.fromStoreId, 'store1');
        assert.equal(firstProductLineItem.custom.fromStoreId, 'store1');
        assert.equal(currentBasket.productLineItems.length, 2);
        assert.equal(currentBasket.getShipments().length, 1);

        // add second BOPIS product to Cart
        cartHelpers.addProductToCart(currentBasket, '000002', 1, [], mockOptions, 'store2', requestMock);
        var secondShipment = collections.find(currentBasket.getShipments(), function (s) {
            return s.custom.fromStoreId === 'store1';
        });
        var secondProductLineItem = collections.find(currentBasket.productLineItems, function (pli) {
            return pli.custom.fromStoreId === 'store2';
        });
        assert.equal(secondShipment.custom.fromStoreId, 'store1');
        assert.equal(secondProductLineItem.custom.fromStoreId, 'store2');
        assert.equal(currentBasket.productLineItems.length, 2);
        assert.equal(currentBasket.getShipments().length, 1);
    });
});

describe('cartHelpers - addProductListItemToCart', function () {
    beforeEach(function () {
        setQuantityValueStub.reset();
        createProductLineItemStub.reset();
        createUUIDStub.reset();

        copyCustomerAddressToShipmentSpy.reset();
        createShipmentSpy.reset();
    });

    after(function () {
        mockSuperModule.remove();
    });

    it('should add a product to the cart when there are no line items in the cart', function () {
        availabilityModelMock.inventoryRecord.ATS.value = 3;
        createProductLineItemStub.returns(productLineItemMock);
        var result = cartHelpers.addProductListItemToCart(emptyBasketMock, 'productListItemID', 1, 'productListID');

        assert.equal(result.uuid, 'someSpecialUUID');
        assert.isTrue(result.success);
        assert.isTrue(createShipmentSpy.calledOnce);
        assert.isTrue(setQuantityValueStub.calledOnce);
        assert.isTrue(setQuantityValueStub.calledWith(1));
    });

    it('should increase the quantity in the cart by one if no quantity is passed in', function () {
        var result = cartHelpers.addProductListItemToCart(currentBasketMock, 'productListItemID', null, 'productListID');
        assert.equal(result.uuid, 'someSpecialUUID');
        assert.isTrue(result.success);
        assert.isTrue(setQuantityValueStub.calledOnce);
    });

    it('should not add a product to the cart when item has is at max ATS', function () {
        availabilityModelMock.inventoryRecord.ATS.value = 2;
        productLineItemMock.quantity.value = 2;
        productLineItemMock.productListItem = productListItemMock;
        var result = cartHelpers.addProductListItemToCart(currentBasketMock, 'productListItemID', 1, 'productListID');

        assert.equal(result.uuid, undefined);
        assert.isTrue(createShipmentSpy.notCalled);
        assert.isTrue(setQuantityValueStub.notCalled);
        assert.isFalse(result.success);
    });

    it('should increase the quantity of the productLine item in the cart if it has the product list item', function () {
        productLineItemMock.quantity.value = 1;
        productLineItemMock.productListItem = productListItemMock;
        createProductLineItemStub.returns(productLineItemMock);
        var result = cartHelpers.addProductListItemToCart(currentBasketMock, 'productListItemID', 1, 'productListID');

        assert.equal(result.uuid, 'someSpecialUUID');
        assert.isTrue(result.success);
        assert.isTrue(createShipmentSpy.notCalled);
        assert.isTrue(setQuantityValueStub.calledOnce);
        assert.isTrue(setQuantityValueStub.calledWith(2));
    });

    it('should not add a product to the cart when item has 1 ATS', function () {
        availabilityModelMock.inventoryRecord.ATS.value = 1;
        createProductLineItemStub.returns(productLineItemMock);
        var result = cartHelpers.addProductListItemToCart(currentBasketMock, 'productListItemID', 2, 'productListID');

        assert.equal(result.uuid, undefined);
        assert.isFalse(result.success);
        assert.isTrue(createShipmentSpy.notCalled);
        assert.isTrue(setQuantityValueStub.notCalled);
    });

    it('should not add a product to the cart when item has 0 ATS', function () {
        availabilityModelMock.inventoryRecord.ATS.value = 0;
        createProductLineItemStub.returns(productLineItemMock);
        var result = cartHelpers.addProductListItemToCart(currentBasketMock, 'productListItemID', 1, 'productListID');

        assert.equal(result.uuid, undefined);
        assert.isFalse(result.success);
        assert.isTrue(createShipmentSpy.notCalled);
        assert.isTrue(setQuantityValueStub.notCalled);
    });

    it('should not add a product to the cart when item has insufficient ATS', function () {
        availabilityModelMock.inventoryRecord.ATS.value = 0;
        createProductLineItemStub.returns(productLineItemMock);
        var result = cartHelpers.addProductListItemToCart(currentBasketMock, 'productListItemID', 5, 'productListID');

        assert.equal(result.uuid, undefined);
        assert.isFalse(result.success);
        assert.isTrue(createShipmentSpy.notCalled);
        assert.isTrue(setQuantityValueStub.notCalled);
    });

    it('should add a line item from a given product to the cart', function () {
        var result = cartHelpers.addLineItem(currentBasketMock, productMock, 1, [], productMock.optionModel, {});
        assert.equal(result.UUID, 'someSpecialUUID');
        assert.equal(result.productID, 'productId');
        assert.equal(result.product.productId, 'productId');
    });

    it('should add a line item from a given product to the cart when bopis is not enabled', function () {
        var currentBasket = createApiBasket();
        assert.equal(currentBasket.productLineItems.length, 2);
        cartHelpers2.addProductToCart(currentBasket, productMock, 1, [], productMock.optionModel, {});
        assert.equal(currentBasket.productLineItems.length, 3);
    });

    it('should return the existing shipment in the cart given a store id with a new productlineitem added', function () {
        var currentBasket = createApiBasket2();

        cartHelpers.addProductToCart(currentBasket, '000009', 1, [], mockOptions, 'store9', requestMock);
        var shipment = collections.find(currentBasket.getShipments(), function (s) {
            return s.custom.fromStoreId === 'store9';
        });
        var productLineItem = collections.find(currentBasket.productLineItems, function (pli) {
            return pli.productID === '000009';
        });
        assert.equal(shipment.custom.fromStoreId, 'store9');
        assert.equal(productLineItem.custom.fromStoreId, '');
        assert.equal(currentBasket.productLineItems.length, 4);
        assert.equal(currentBasket.getShipments().length, 2);
    });
});
