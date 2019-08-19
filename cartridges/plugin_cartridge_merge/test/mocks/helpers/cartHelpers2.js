'use strict';

/* eslint require-jsdoc: 0 */  // --> OFF


var baseCartHelpersMock = require('../../../test/mocks/scripts/cart/baseCartHelpers.js');
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var storeMgr = require('../dw/catalog/StoreMgr');
var ShippingMgr = require('../dw/order/ShippingMgr');
var arrayHelper = require('../util/array');
var collections = require('../util/collections');
var cartHelpersCommon = require('./cartHelpers_common.js');

function proxyModel() {
    return proxyquire('../../../../plugin_cartridge_merge/cartridges/plugin_cartridge_merge/cartridge/scripts/cart/cartHelpers', {
        getExistingProductLineItemInCartWithTheSameStore: cartHelpersCommon.getExistingProductLineItemInCartWithTheSameStore,
        'app_storefront_base/cartridge/scripts/cart/cartHelpers': baseCartHelpersMock,
        'dw/catalog/StoreMgr': storeMgr,
        'dw/catalog/ProductMgr': {
            getProduct: cartHelpersCommon.getProduct
        },
        'dw/order/ShippingMgr': ShippingMgr,
        'dw/util/UUIDUtils': {
            createUUID: cartHelpersCommon.createUUID
        },
        'dw/system/Transaction': {
            wrap: cartHelpersCommon.wrap
        },
        'dw/web/Resource': {
            msg: cartHelpersCommon.msg,
            msgf: cartHelpersCommon.msgf
        },
        'dw/customer/ProductListMgr': {
            getProductList: cartHelpersCommon.getProductList
        },
        '*/cartridge/scripts/helpers/productHelpers': {
            getOptions: cartHelpersCommon.getOptions,
            getCurrentOptionModel: cartHelpersCommon.getCurrentOptionModel
        },
        '*/cartridge/scripts/helpers/instorePickupStoreHelpers': {
            setStoreInProductLineItem: cartHelpersCommon.setStoreInProductLineItem
        },
        '~/cartridge/scripts/overlayHelper': {
            isPluginEnabled: function (sitePreference) {
                return sitePreference === 'somethingElse';
            },
            enabledPlugins: cartHelpersCommon.enabledPlugins,
            appendPluginPreferences: cartHelpersCommon.appendPluginPreferences
        },
        '*/cartridge/scripts/util/array': arrayHelper,
        '*/cartridge/scripts/util/collections': collections,
        '*/cartridge/scripts/checkout/checkoutHelpers': {
            copyShippingAddressToShipment: cartHelpersCommon.copyShippingAddressToShipment
        }
    });
}

module.exports = proxyModel();
