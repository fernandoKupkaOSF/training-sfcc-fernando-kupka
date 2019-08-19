'use strict';

var assert = require('chai').assert;
var ProductListItem = require('../../../mocks/models/productListItem');

describe('productListItem Model', function () {
    it('should return a productListItem model with master product: for input productListItem with master product', function () {
        var productListItemObjectMock = {
            productID: 'some pid',
            UUID: 'some UUID',
            product: {
                name: 'some productName',
                master: 'some productMaster',
                bundle: false,
                minOrderQuantity: {
                    value: 'product minOrderQuantity'
                },
                availabilityModel: {
                    inventoryRecord: {
                        ATS: {
                            value: 10
                        }
                    }
                }
            },
            quantityValue: 2,
            public: 'some PublicItem',
            getLastModified: function () {
                return {
                    getTime: function () {
                        return '1527213625';
                    }
                };
            },
            getCreationDate: function () {
                return {
                    getTime: function () {
                        return '1527213655';
                    }
                };
            }
        };

        var expectResult = {
            'productListItem': {
                'pid': 'some pid',
                'UUID': 'some UUID',
                'name': 'some productName',
                'qty': 2,
                'maxOrderQuantity': 10,
                'lastModified': '1527213625',
                'creationDate': '1527213655',
                'publicItem': 'some PublicItem',
                'imageObj': {
                    'product': 'some product image'
                },
                'priceObj': {
                    'object': 'somre price Object'
                },
                'master': 'some productMaster',
                'bundle': false
            }
        };

        var result = new ProductListItem(productListItemObjectMock);

        assert.equal(result.productListItem.pid, expectResult.productListItem.pid);
        assert.equal(result.productListItem.UUID, expectResult.productListItem.UUID);
        assert.equal(result.productListItem.name, expectResult.productListItem.name);
        assert.equal(result.productListItem.qty, expectResult.productListItem.qty);
        assert.equal(result.productListItem.maxOrderQuantity, expectResult.productListItem.maxOrderQuantity);
        assert.equal(result.productListItem.lastModified, expectResult.productListItem.lastModified);
        assert.equal(result.productListItem.creationDate, expectResult.productListItem.creationDate);
        assert.equal(result.productListItem.publicItem, expectResult.productListItem.publicItem);
        assert.equal(result.productListItem.imageObj.product, expectResult.productListItem.imageObj.product);
        assert.equal(result.productListItem.priceObj.object, expectResult.productListItem.priceObj.object);
        assert.equal(result.productListItem.master, expectResult.productListItem.master);
        assert.equal(result.productListItem.bundle, expectResult.productListItem.bundle);
    });

    it('getMaxOrderQty: Should return in stock qty if in stock qty is less than default max qty', function () {
        var productListItemObjectMock = {
            productID: 'some pid',
            UUID: 'some UUID',
            product: {
                name: 'some productName',
                master: 'some productMaster',
                bundle: false,
                minOrderQuantity: {
                    value: 'product minOrderQuantity'
                },
                availabilityModel: {
                    inventoryRecord: {
                        ATS: {
                            value: 5
                        }
                    }
                }
            },
            quantityValue: 2,
            public: 'some PublicItem',
            getLastModified: function () {
                return {
                    getTime: function () {
                        return '1527213625';
                    }
                };
            },
            getCreationDate: function () {
                return {
                    getTime: function () {
                        return '1527213655';
                    }
                };
            }
        };

        var expectResult = {
            'productListItem': {
                'pid': 'some pid',
                'UUID': 'some UUID',
                'name': 'some productName',
                'qty': 2,
                'maxOrderQuantity': 5,
                'lastModified': '1527213625',
                'creationDate': '1527213655',
                'publicItem': 'some PublicItem',
                'imageObj': {
                    'product': 'some product image'
                },
                'priceObj': {
                    'object': 'somre price Object'
                },
                'master': 'some productMaster',
                'bundle': false
            }
        };

        var result = new ProductListItem(productListItemObjectMock);

        assert.equal(result.productListItem.pid, expectResult.productListItem.pid);
        assert.equal(result.productListItem.UUID, expectResult.productListItem.UUID);
        assert.equal(result.productListItem.name, expectResult.productListItem.name);
        assert.equal(result.productListItem.qty, expectResult.productListItem.qty);
        assert.equal(result.productListItem.maxOrderQuantity, expectResult.productListItem.maxOrderQuantity);
        assert.equal(result.productListItem.lastModified, expectResult.productListItem.lastModified);
        assert.equal(result.productListItem.creationDate, expectResult.productListItem.creationDate);
        assert.equal(result.productListItem.publicItem, expectResult.productListItem.publicItem);
        assert.equal(result.productListItem.imageObj.product, expectResult.productListItem.imageObj.product);
        assert.equal(result.productListItem.priceObj.object, expectResult.productListItem.priceObj.object);
        assert.equal(result.productListItem.master, expectResult.productListItem.master);
        assert.equal(result.productListItem.bundle, expectResult.productListItem.bundle);
    });

    it('getMaxOrderQty: Should return default max qty if in stock is greater than default max qty', function () {
        var productListItemObjectMock = {
            productID: 'some pid',
            UUID: 'some UUID',
            product: {
                name: 'some productName',
                master: 'some productMaster',
                bundle: false,
                minOrderQuantity: {
                    value: 'product minOrderQuantity'
                },
                availabilityModel: {
                    inventoryRecord: {
                        ATS: {
                            value: 15
                        }
                    }
                }
            },
            quantityValue: 2,
            public: 'some PublicItem',
            getLastModified: function () {
                return {
                    getTime: function () {
                        return '1527213625';
                    }
                };
            },
            getCreationDate: function () {
                return {
                    getTime: function () {
                        return '1527213655';
                    }
                };
            }
        };

        var expectResult = {
            'productListItem': {
                'pid': 'some pid',
                'UUID': 'some UUID',
                'name': 'some productName',
                'qty': 2,
                'maxOrderQuantity': 10,
                'lastModified': '1527213625',
                'creationDate': '1527213655',
                'publicItem': 'some PublicItem',
                'imageObj': {
                    'product': 'some product image'
                },
                'priceObj': {
                    'object': 'somre price Object'
                },
                'master': 'some productMaster',
                'bundle': false
            }
        };

        var result = new ProductListItem(productListItemObjectMock);

        assert.equal(result.productListItem.pid, expectResult.productListItem.pid);
        assert.equal(result.productListItem.UUID, expectResult.productListItem.UUID);
        assert.equal(result.productListItem.name, expectResult.productListItem.name);
        assert.equal(result.productListItem.qty, expectResult.productListItem.qty);
        assert.equal(result.productListItem.maxOrderQuantity, expectResult.productListItem.maxOrderQuantity);
        assert.equal(result.productListItem.lastModified, expectResult.productListItem.lastModified);
        assert.equal(result.productListItem.creationDate, expectResult.productListItem.creationDate);
        assert.equal(result.productListItem.publicItem, expectResult.productListItem.publicItem);
        assert.equal(result.productListItem.imageObj.product, expectResult.productListItem.imageObj.product);
        assert.equal(result.productListItem.priceObj.object, expectResult.productListItem.priceObj.object);
        assert.equal(result.productListItem.master, expectResult.productListItem.master);
        assert.equal(result.productListItem.bundle, expectResult.productListItem.bundle);
    });

    it('should return a productListItem model with NO master product: for input productListItem with NO master product', function () {
        var productListItemObjectMock = {
            productID: 'some pid',
            UUID: 'some UUID',
            product: {
                name: 'some productName',
                bundle: false,
                minOrderQuantity: {
                    value: 'product minOrderQuantity'
                },
                availabilityModel: 'product availability model'
            },
            quantityValue: 2,
            public: 'some PublicItem',
            getLastModified: function () {
                return {
                    getTime: function () {
                        return '1527213625';
                    }
                };
            },
            getCreationDate: function () {
                return {
                    getTime: function () {
                        return '1527213655';
                    }
                };
            }
        };

        var expectResult = {
            'productListItem': {
                'pid': 'some pid',
                'UUID': 'some UUID',
                'name': 'some productName',
                'qty': 2,
                'lastModified': '1527213625',
                'creationDate': '1527213655',
                'publicItem': 'some PublicItem',
                'imageObj': {
                    'product': 'some product image'
                },
                'priceObj': {
                    'object': 'somre price Object'
                },
                'bundle': false,
                'bundleItems': []
            }
        };

        var result = new ProductListItem(productListItemObjectMock);

        assert.equal(result.productListItem.pid, expectResult.productListItem.pid);
        assert.equal(result.productListItem.UUID, expectResult.productListItem.UUID);
        assert.equal(result.productListItem.name, expectResult.productListItem.name);
        assert.equal(result.productListItem.qty, expectResult.productListItem.qty);
        assert.equal(result.productListItem.lastModified, expectResult.productListItem.lastModified);
        assert.equal(result.productListItem.creationDate, expectResult.productListItem.creationDate);
        assert.equal(result.productListItem.publicItem, expectResult.productListItem.publicItem);
        assert.equal(result.productListItem.imageObj.product, expectResult.productListItem.imageObj.product);
        assert.equal(result.productListItem.priceObj.object, expectResult.productListItem.priceObj.object);
        assert.isUndefined(result.productListItem.master);
        assert.equal(result.productListItem.bundle, expectResult.productListItem.bundle);
        assert.equal(result.productListItem.bundleItems, expectResult.productListItem.bundle);
    });

    it('should return a productListItem model with bundle product', function () {
        var productListItemObjectMock = {
            productID: 'some pid',
            UUID: 'some UUID',
            product: {
                name: 'some productName',
                bundle: true,
                bundledProducts: {
                    toArray: function () {
                        return [
                            {
                                ID: 'bundleProduct1ID',
                                name: 'bundleProduct1Name'

                            },
                            {
                                ID: 'bundleProduct2ID',
                                name: 'bundleProduct1Name'
                            }
                        ];
                    }
                },
                minOrderQuantity: {
                    value: 'product minOrderQuantity'
                },
                availabilityModel: 'product availability model'
            },
            quantityValue: 2,
            public: 'some PublicItem',
            getLastModified: function () {
                return {
                    getTime: function () {
                        return '1527213625';
                    }
                };
            },
            getCreationDate: function () {
                return {
                    getTime: function () {
                        return '1527213655';
                    }
                };
            }
        };

        var expectResult = {
            'productListItem': {
                'pid': 'some pid',
                'UUID': 'some UUID',
                'name': 'some productName',
                'qty': 2,
                'lastModified': '1527213625',
                'creationDate': '1527213655',
                'publicItem': 'some PublicItem',
                'imageObj': {
                    'product': 'some product image'
                },
                'priceObj': {
                    'object': 'somre price Object'
                },
                'bundle': true,
                'bundleItems': [
                    {
                        'pid': 'bundleProduct1ID',
                        'name': 'bundleProduct1Name',
                        'imageObj': {
                            'product': 'some product image'
                        }
                    }, {
                        'pid': 'bundleProduct2ID',
                        'name': 'bundleProduct1Name',
                        'imageObj': {
                            'product': 'some product image'
                        }
                    }
                ]
            }
        };

        var result = new ProductListItem(productListItemObjectMock);
        assert.equal(result.productListItem.pid, expectResult.productListItem.pid);
        assert.equal(result.productListItem.UUID, expectResult.productListItem.UUID);
        assert.equal(result.productListItem.name, expectResult.productListItem.name);
        assert.equal(result.productListItem.qty, expectResult.productListItem.qty);
        assert.equal(result.productListItem.lastModified, expectResult.productListItem.lastModified);
        assert.equal(result.productListItem.creationDate, expectResult.productListItem.creationDate);
        assert.equal(result.productListItem.publicItem, expectResult.productListItem.publicItem);
        assert.equal(result.productListItem.imageObj.product, expectResult.productListItem.imageObj.product);
        assert.equal(result.productListItem.priceObj.object, expectResult.productListItem.priceObj.object);
        assert.isUndefined(result.productListItem.master);
        assert.equal(result.productListItem.bundle, expectResult.productListItem.bundle);
        assert.equal(result.productListItem.bundleItems[0].pid, expectResult.productListItem.bundleItems[0].pid);
        assert.equal(result.productListItem.bundleItems[0].name, expectResult.productListItem.bundleItems[0].name);
        assert.equal(result.productListItem.bundleItems[0].imageObj.product, expectResult.productListItem.bundleItems[0].imageObj.product);

        assert.equal(result.productListItem.bundleItems[1].pid, expectResult.productListItem.bundleItems[1].pid);
        assert.equal(result.productListItem.bundleItems[1].name, expectResult.productListItem.bundleItems[1].name);
        assert.equal(result.productListItem.bundleItems[1].imageObj.product, expectResult.productListItem.bundleItems[1].imageObj.product);
        assert.equal(result.productListItem.bundleItems.length, expectResult.productListItem.bundleItems.length);
    });

    it('should return a productListItem model with option product:', function () {
        var productListItemObjectMock = {
            productID: 'some pid',
            UUID: 'some UUID',
            product: {
                name: 'some productName',
                bundle: false,
                optionProduct: true,
                minOrderQuantity: {
                    value: 'product minOrderQuantity'
                },
                availabilityModel: 'product availability model'
            },
            productOptionModel: {
                options: {
                    toArray: function () {
                        return [
                            {
                                displayName: 'optionADisplayName',
                                ID: 'optionID'
                            }
                        ];
                    }
                },
                getSelectedOptionValue: function () {
                    return {
                        displayValue: 'displayValue',
                        ID: 'selectedOptionValueID'
                    };
                }
            },
            quantityValue: 2,
            public: 'some PublicItem',
            getLastModified: function () {
                return {
                    getTime: function () {
                        return '1527213625';
                    }
                };
            },
            getCreationDate: function () {
                return {
                    getTime: function () {
                        return '1527213655';
                    }
                };
            }
        };

        var expectResult = {
            'productListItem': {
                'pid': 'some pid',
                'UUID': 'some UUID',
                'name': 'some productName',
                'qty': 2,
                'lastModified': '1527213625',
                'creationDate': '1527213655',
                'publicItem': 'some PublicItem',
                'imageObj': {
                    'product': 'some product image'
                },
                'priceObj': {
                    'object': 'somre price Object'
                },
                'bundle': false,
                'bundleItems': [],
                'options': [
                    {
                        'displayName': 'optionADisplayName',
                        'displayValue': 'displayValue',
                        'optionId': 'optionID',
                        'selectedValueId': 'selectedOptionValueID'
                    }
                ]

            }
        };
        var result = new ProductListItem(productListItemObjectMock);

        assert.equal(result.productListItem.pid, expectResult.productListItem.pid);
        assert.equal(result.productListItem.UUID, expectResult.productListItem.UUID);
        assert.equal(result.productListItem.name, expectResult.productListItem.name);
        assert.equal(result.productListItem.qty, expectResult.productListItem.qty);
        assert.equal(result.productListItem.lastModified, expectResult.productListItem.lastModified);
        assert.equal(result.productListItem.creationDate, expectResult.productListItem.creationDate);
        assert.equal(result.productListItem.publicItem, expectResult.productListItem.publicItem);
        assert.equal(result.productListItem.imageObj.product, expectResult.productListItem.imageObj.product);
        assert.equal(result.productListItem.priceObj.object, expectResult.productListItem.priceObj.object);
        assert.isUndefined(result.productListItem.master);
        assert.equal(result.productListItem.bundle, expectResult.productListItem.bundle);
        assert.equal(result.productListItem.bundleItems.length, expectResult.productListItem.bundleItems.length);
        assert.equal(result.productListItem.options[0].displayName, expectResult.productListItem.options[0].displayName);
        assert.equal(result.productListItem.options[0].displayValue, expectResult.productListItem.options[0].displayValue);
    });

    it('should return null when NO productListItem', function () {
        var productListItemObjectMock = null;
        var result = new ProductListItem(productListItemObjectMock);

        assert.isNull(result.productListItem);
    });
});
