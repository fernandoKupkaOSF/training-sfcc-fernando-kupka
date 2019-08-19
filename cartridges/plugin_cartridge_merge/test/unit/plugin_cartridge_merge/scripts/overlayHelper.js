'use strict';

var assert = require('chai').assert;
var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var collections = require('../../../mocks/util/collections');

describe('overlayHelper', function () {
    it('should return some positive value', function () {
        var cartHelpers = proxyquire('../../../../cartridges/plugin_cartridge_merge/cartridge/scripts/overlayHelper', {
            preferencePrefix: 'sfraEnableOverlay',
            preferenceGroup: 'SFRA Unified Feature Cartridge',
            'dw/system/Site': {
                current: {
                    getCustomPreferenceValue: function () {
                        return 'something';
                    }
                }
            }
        });
        assert.equal('something', cartHelpers.isPluginEnabled('giftregistry'));
    });

    it('should confirm the given plugin cartridge is enabled', function () {
        var cartHelpers = proxyquire('../../../../cartridges/plugin_cartridge_merge/cartridge/scripts/overlayHelper', {
            '*/cartridge/scripts/util/collections': collections,
            preferencePrefix: 'sfraEnableOverlay',
            preferenceGroup: 'SFRA Unified Feature Cartridge',
            sfraPreferences: {},
            'dw/system/Site': {
                getCurrent: function () {
                    return {
                        getPreferences: function () {
                            return {
                                describe: function () {
                                    return {
                                        attributeGroups: [
                                            {
                                                ID: 'SFRA Unified Feature Cartridge',
                                                attributeDefinitions: [{
                                                    ID: 'sfraEnableOverlayBOPIS'
                                                }]
                                            }
                                        ]
                                    };
                                }
                            };
                        }
                    };
                },
                current: {
                    getCustomPreferenceValue: function () {
                        return true;
                    }
                }
            }
        });
        assert.isTrue(cartHelpers.enabledPlugins().BOPIS);
    });

    it('should confirm the given plugin cartridge is diabled', function () {
        var cartHelpers = proxyquire('../../../../cartridges/plugin_cartridge_merge/cartridge/scripts/overlayHelper', {
            '*/cartridge/scripts/util/collections': collections,
            preferencePrefix: 'sfraEnableOverlay',
            preferenceGroup: 'SFRA Unified Feature Cartridge',
            sfraPreferences: {},
            'dw/system/Site': {
                getCurrent: function () {
                    return {
                        getPreferences: function () {
                            return {
                                describe: function () {
                                    return {
                                        attributeGroups: [
                                            {
                                                ID: 'SFRA Unified Feature Cartridge',
                                                attributeDefinitions: [{
                                                    ID: 'sfraEnableOverlayBOPIS'
                                                }]
                                            }
                                        ]
                                    };
                                }
                            };
                        }
                    };
                },
                current: {
                    getCustomPreferenceValue: function () {
                        return false;
                    }
                }
            }
        });
        assert.isFalse(cartHelpers.enabledPlugins().BOPIS);
    });

    it('should confirm that multiple cartridges are returned', function () {
        var cartHelpers = proxyquire('../../../../cartridges/plugin_cartridge_merge/cartridge/scripts/overlayHelper', {
            '*/cartridge/scripts/util/collections': collections,
            preferencePrefix: 'sfraEnableOverlay',
            preferenceGroup: 'SFRA Unified Feature Cartridge',
            sfraPreferences: {},
            'dw/system/Site': {
                getCurrent: function () {
                    return {
                        getPreferences: function () {
                            return {
                                describe: function () {
                                    return {
                                        attributeGroups: [
                                            {
                                                ID: 'SFRA Unified Feature Cartridge',
                                                attributeDefinitions: [{
                                                    ID: 'sfraEnableOverlayBOPIS'
                                                },
                                                {
                                                    ID: 'sfraEnableOverlayApplepay'
                                                },
                                                {
                                                    ID: 'sfraEnableOverlayGiftRegistry'
                                                }
                                                ]
                                            }
                                        ]
                                    };
                                }
                            };
                        }
                    };
                },
                current: {
                    getCustomPreferenceValue: function () {
                        return true;
                    }
                }
            }
        });
        var sitePreferences = cartHelpers.enabledPlugins();
        assert.isTrue(sitePreferences.BOPIS);
        assert.isTrue(sitePreferences.Applepay);
        assert.isTrue(sitePreferences.GiftRegistry);
    });
});

