'use strict';

var assert = require('chai').assert;

describe('CompareAttributes model', function () {
    var CompareAttributesModel = require('../../../../cartridges/plugin_productcompare/cartridge/models/compareAttributes');
    var products;

    beforeEach(function () {
        products = [{
            id: 'product1',
            attributes: [{
                name: 'AttrType 1',
                ID: 'attrType1',
                attributes: [{
                    label: 'Height',
                    value: ['50 meters']
                }]
            }, {
                name: 'Main Attributes',
                ID: 'mainAttributes',
                attributes: [{
                    label: 'Memory Size',
                    value: ['1GB']
                }, {
                    label: 'Songs Capacity',
                    value: ['1 Million songs']
                }]
            }, {
                name: 'AttrType 2',
                ID: 'attrType1',
                attributes: [{
                    label: 'Weight',
                    value: ['500 kg']
                }]
            }]
        }, {
            id: 'product2',
            attributes: [{
                name: 'AttrType 1',
                ID: 'attrType1',
                attributes: [{
                    label: 'Height',
                    value: ['75 meters']
                }]
            }, {
                name: 'Main Attributes',
                ID: 'mainAttributes',
                attributes: [{
                    label: 'Memory Size',
                    value: ['5GB']
                }, {
                    label: 'Songs Capacity',
                    value: ['5 Billion songs']
                }]
            }, {
                name: 'AttrType 2',
                ID: 'attrType1',
                attributes: [{
                    label: 'Weight',
                    value: ['1500 kg']
                }]
            }]
        }];
    });

    var expectedAttrs = [{
        'values': [{
            'pid': 'product1',
            'values': '1GB'
        }, {
            'pid': 'product2',
            'values': '5GB'
        }],
        'order': 0,
        'displayName': 'Memory Size'
    }, {
        'values': [{
            'pid': 'product1',
            'values': '1 Million songs'
        }, {
            'pid': 'product2',
            'values': '5 Billion songs'
        }],
        'order': 0,
        'displayName': 'Songs Capacity'
    }, {
        'values': [{
            'pid': 'product1',
            'values': '50 meters'
        }, {
            'pid': 'product2',
            'values': '75 meters'
        }],
        'order': 1,
        'displayName': 'Height'
    }, {
        'values': [{
            'pid': 'product1',
            'values': '500 kg'
        }, {
            'pid': 'product2',
            'values': '1500 kg'
        }],
        'order': 1,
        'displayName': 'Weight'
    }];

    it('should order main attributes first', function () {
        var compareAttrs = (new CompareAttributesModel(products)).slice(0);
        assert.deepEqual(compareAttrs, expectedAttrs);
    });

    it('should filter out uncommon attributes', function () {
        products[0].attributes[0].attributes.push({
            label: 'Unique Attribute 1',
            value: ['does not matter - will not show up']
        });

        var compareAttrs = (new CompareAttributesModel(products)).slice(0);
        assert.deepEqual(compareAttrs, expectedAttrs);
    });
});
