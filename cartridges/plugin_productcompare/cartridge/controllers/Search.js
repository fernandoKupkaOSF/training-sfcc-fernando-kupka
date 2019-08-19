'use strict';

var server = require('server');
server.extend(module.superModule);
var CatalogMgr = require('dw/catalog/CatalogMgr');

/**
 * Climb up the category tree to see if any parents have the enable compare turned on
 *
 * @param {Object} productSearch - product search result model
 * @return {boolean} - boolean to determine if the template should display the compare checkbox
 */
function getCategoryCompareStatus(productSearch) {
    var compareBooleanValue = false;
    if (productSearch && productSearch.category) {
        var currentCategory;
        var selectedCategory;
        compareBooleanValue = true;
        selectedCategory = CatalogMgr.getCategory(productSearch.category.id);
        compareBooleanValue = selectedCategory.custom.enableCompare;

        if (selectedCategory.parent) {
            currentCategory = selectedCategory.parent;
            while (currentCategory.ID !== 'root') {
                compareBooleanValue = compareBooleanValue || currentCategory.custom.enableCompare;
                currentCategory = currentCategory.parent;
            }
        }
    }
    return compareBooleanValue;
}

server.append('ShowAjax', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.compareEnabled = getCategoryCompareStatus(viewData.productSearch);
    res.setViewData(viewData);
    next();
});

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.compareEnabled = getCategoryCompareStatus(viewData.productSearch);
    res.setViewData(viewData);
    next();
});

server.append('UpdateGrid', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.compareEnabled = getCategoryCompareStatus(viewData.productSearch);
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
