'use strict';

var CatalogMgr = require('dw/catalog/CatalogMgr');
var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var productFactory = require('*/cartridge/scripts/factories/product');
var CompareAttributesModel = require('*/cartridge/models/compareAttributes');

server.get('Show', cache.applyDefaultCache, function (req, res, next) {
    var compareProductsForm = req.querystring;
    var category = CatalogMgr.getCategory(compareProductsForm.cgid);
    var pids = Object.keys(compareProductsForm)
        .filter(function (key) { return key.indexOf('pid') === 0; })
        .map(function (pid) { return compareProductsForm[pid]; });
    var products = pids.map(function (pid) {
        return productFactory.get({ pid: pid });
    });

    res.render('product/comparison', {
        category: {
            name: category.displayName,
            imgUrl: category.image ? category.image.url.toString() : null
        },
        pids: pids,
        attributes: (new CompareAttributesModel(products)).slice(0)
    });

    next();
});

module.exports = server.exports();
