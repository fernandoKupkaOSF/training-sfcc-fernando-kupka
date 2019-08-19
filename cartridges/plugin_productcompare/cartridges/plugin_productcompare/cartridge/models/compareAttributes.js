'use strict';

/**
 * @constructor
 * @desc Get an ordered list of product attributes
 *
 * @param {Product} products - Selected products instantiated through productFactory
 */
function CompareAttributesModel(products) {
    var attributes = {};
    var sorted = [];

    products.forEach(function (product) {
        if (product.attributes) {
            product.attributes.forEach(function (productAttr) {
                var isMainAttr = productAttr.ID === 'mainAttributes';
                productAttr.attributes.forEach(function (attr) {
                    if (!attributes[attr.label]) {
                        attributes[attr.label] = {
                            values: [],
                            order: isMainAttr ? 0 : 1
                        };
                    }
                    attributes[attr.label].values.push({
                        pid: product.id,
                        values: attr.value.join(',')
                    });
                });
            });
        }
    });

    Object.keys(attributes).sort(function (a, b) {
        return attributes[a].order - attributes[b].order;
    }).forEach(function (key) {
        if (attributes[key].values.length === products.length) {
            var attrs = attributes[key];
            attrs.displayName = key;
            sorted.push(attrs);
        }
    });
    sorted.forEach(function (attr) {
        this.push(attr);
    }, this);
}

CompareAttributesModel.prototype = [];

module.exports = CompareAttributesModel;
