/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/app_storefront_training/cartridge/client/default/js/productTile.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/app_storefront_training/cartridge/client/default/js/product/base.js":
/*!****************************************************************************************!*\
  !*** ./cartridges/app_storefront_training/cartridge/client/default/js/product/base.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Retrieves the relevant pid value
 * @param {jquery} $el - DOM container for a given add to cart button
 * @return {string} - value to be used when adding product to cart
 */

function getPidValue($el) {
  var pid;

  if ($('#quickViewModal').hasClass('show') && !$('.product-set').length) {
    pid = $($el).closest('.modal-content').find('.product-quickview').data('pid');
  } else if ($('.product-set-detail').length || $('.product-set').length) {
    pid = $($el).closest('.product-detail').find('.product-id').text();
  } else {
    pid = $('.product-detail:not(".bundle-item")').data('pid');
  }

  return pid;
}
/**
 * Retrieve contextual quantity selector
 * @param {jquery} $el - DOM container for the relevant quantity
 * @return {jquery} - quantity selector DOM container
 */


function getQuantitySelector($el) {
  return $el && $('.set-items').length ? $($el).closest('.product-detail').find('.quantity-select') : $('.quantity-select');
}
/**
 * Retrieves the value associated with the Quantity pull-down menu
 * @param {jquery} $el - DOM container for the relevant quantity
 * @return {string} - value found in the quantity input
 */


function getQuantitySelected($el) {
  return getQuantitySelector($el).val();
}
/**
 * Process the attribute values for an attribute that has image swatches
 *
 * @param {Object} attr - Attribute
 * @param {string} attr.id - Attribute ID
 * @param {Object[]} attr.values - Array of attribute value objects
 * @param {string} attr.values.value - Attribute coded value
 * @param {string} attr.values.url - URL to de/select an attribute value of the product
 * @param {boolean} attr.values.isSelectable - Flag as to whether an attribute value can be
 *     selected.  If there is no variant that corresponds to a specific combination of attribute
 *     values, an attribute may be disabled in the Product Detail Page
 * @param {jQuery} $productContainer - DOM container for a given product
 */


function processSwatchValues(attr, $productContainer) {
  attr.values.forEach(function (attrValue) {
    var $attrValue = $productContainer.find('[data-attr="' + attr.id + '"] [data-attr-value="' + attrValue.value + '"]');
    var $swatchAnchor = $attrValue.parent();

    if (attrValue.selected) {
      $attrValue.addClass('selected');
    } else {
      $attrValue.removeClass('selected');
    }

    if (attrValue.url) {
      $swatchAnchor.attr('href', attrValue.url);
    } else {
      $swatchAnchor.removeAttr('href');
    } // Disable if not selectable


    $attrValue.removeClass('selectable unselectable');
    $attrValue.addClass(attrValue.selectable ? 'selectable' : 'unselectable');
  });
}
/**
 * Process attribute values associated with an attribute that does not have image swatches
 *
 * @param {Object} attr - Attribute
 * @param {string} attr.id - Attribute ID
 * @param {Object[]} attr.values - Array of attribute value objects
 * @param {string} attr.values.value - Attribute coded value
 * @param {string} attr.values.url - URL to de/select an attribute value of the product
 * @param {boolean} attr.values.isSelectable - Flag as to whether an attribute value can be
 *     selected.  If there is no variant that corresponds to a specific combination of attribute
 *     values, an attribute may be disabled in the Product Detail Page
 * @param {jQuery} $productContainer - DOM container for a given product
 */


function processNonSwatchValues(attr, $productContainer) {
  var $attr = '[data-attr="' + attr.id + '"]';
  var $defaultOption = $productContainer.find($attr + ' .select-' + attr.id + ' option:first');
  $defaultOption.attr('value', attr.resetUrl);
  attr.values.forEach(function (attrValue) {
    var $attrValue = $productContainer.find($attr + ' [data-attr-value="' + attrValue.value + '"]');
    $attrValue.attr('value', attrValue.url).removeAttr('disabled');

    if (!attrValue.selectable) {
      $attrValue.attr('disabled', true);
    }
  });
}
/**
 * Routes the handling of attribute processing depending on whether the attribute has image
 *     swatches or not
 *
 * @param {Object} attrs - Attribute
 * @param {string} attr.id - Attribute ID
 * @param {jQuery} $productContainer - DOM element for a given product
 */


function updateAttrs(attrs, $productContainer) {
  // Currently, the only attribute type that has image swatches is Color.
  var attrsWithSwatches = ['color'];
  attrs.forEach(function (attr) {
    if (attrsWithSwatches.indexOf(attr.id) > -1) {
      processSwatchValues(attr, $productContainer);
    } else {
      processNonSwatchValues(attr, $productContainer);
    }
  });
}
/**
 * Updates the availability status in the Product Detail Page
 *
 * @param {Object} response - Ajax response object after an
 *                            attribute value has been [de]selected
 * @param {jQuery} $productContainer - DOM element for a given product
 */


function updateAvailability(response, $productContainer) {
  var availabilityValue = '';
  var availabilityMessages = response.product.availability.messages;

  if (!response.product.readyToOrder) {
    availabilityValue = '<div>' + response.resources.info_selectforstock + '</div>';
  } else {
    availabilityMessages.forEach(function (message) {
      availabilityValue += '<div>' + message + '</div>';
    });
  }

  $($productContainer).trigger('product:updateAvailability', {
    product: response.product,
    $productContainer: $productContainer,
    message: availabilityValue,
    resources: response.resources
  });
}
/**
 * Generates html for promotions section
 *
 * @param {array} promotions - list of promotions
 * @return {string} - Compiled HTML
 */


function getPromotionsHtml(promotions) {
  if (!promotions) {
    return '';
  }

  var html = '';
  promotions.forEach(function (promotion) {
    html += '<div class="callout" title="' + promotion.details + '">' + promotion.calloutMsg + '</div>';
  });
  return html;
}
/**
 * Generates html for product attributes section
 *
 * @param {array} attributes - list of attributes
 * @return {string} - Compiled HTML
 */


function getAttributesHtml(attributes) {
  if (!attributes) {
    return '';
  }

  var html = '';
  attributes.forEach(function (attributeGroup) {
    if (attributeGroup.ID === 'mainAttributes') {
      attributeGroup.attributes.forEach(function (attribute) {
        html += '<div class="attribute-values">' + attribute.label + ': ' + attribute.value + '</div>';
      });
    }
  });
  return html;
}
/**
 * @typedef UpdatedOptionValue
 * @type Object
 * @property {string} id - Option value ID for look up
 * @property {string} url - Updated option value selection URL
 */

/**
 * @typedef OptionSelectionResponse
 * @type Object
 * @property {string} priceHtml - Updated price HTML code
 * @property {Object} options - Updated Options
 * @property {string} options.id - Option ID
 * @property {UpdatedOptionValue[]} options.values - Option values
 */

/**
 * Updates DOM using post-option selection Ajax response
 *
 * @param {OptionSelectionResponse} options - Ajax response options from selecting a product option
 * @param {jQuery} $productContainer - DOM element for current product
 */


function updateOptions(options, $productContainer) {
  options.forEach(function (option) {
    var $optionEl = $productContainer.find('.product-option[data-option-id*="' + option.id + '"]');
    option.values.forEach(function (value) {
      var valueEl = $optionEl.find('option[data-value-id*="' + value.id + '"]');
      valueEl.val(value.url);
    });
  });
}
/**
 * Parses JSON from Ajax call made whenever an attribute value is [de]selected
 * @param {Object} response - response from Ajax call
 * @param {Object} response.product - Product object
 * @param {string} response.product.id - Product ID
 * @param {Object[]} response.product.variationAttributes - Product attributes
 * @param {Object[]} response.product.images - Product images
 * @param {boolean} response.product.hasRequiredAttrsSelected - Flag as to whether all required
 *     attributes have been selected.  Used partially to
 *     determine whether the Add to Cart button can be enabled
 * @param {jQuery} $productContainer - DOM element for a given product.
 */


function handleVariantResponse(response, $productContainer) {
  var isChoiceOfBonusProducts = $productContainer.parents('.choose-bonus-product-dialog').length > 0;
  var isVaraint;

  if (response.product.variationAttributes) {
    updateAttrs(response.product.variationAttributes, $productContainer);
    isVaraint = response.product.productType === 'variant';

    if (isChoiceOfBonusProducts && isVaraint) {
      $productContainer.parent('.bonus-product-item').data('pid', response.product.id);
      $productContainer.parent('.bonus-product-item').data('ready-to-order', response.product.readyToOrder);
    }
  } // Update primary images


  var primaryImageUrls = response.product.images;
  primaryImageUrls.large.forEach(function (imageUrl, idx) {
    $productContainer.find('.primary-images').find('img').eq(idx).attr('src', imageUrl.url);
  }); // Update pricing

  if (!isChoiceOfBonusProducts) {
    var $priceSelector = $('.prices .price', $productContainer).length ? $('.prices .price', $productContainer) : $('.prices .price');
    $priceSelector.replaceWith(response.product.price.html);
  } // Update promotions


  $('.promotions').empty().html(getPromotionsHtml(response.product.promotions));
  updateAvailability(response, $productContainer);

  if (isChoiceOfBonusProducts) {
    var $selectButton = $productContainer.find('.select-bonus-product');
    $selectButton.trigger('bonusproduct:updateSelectButton', {
      product: response.product,
      $productContainer: $productContainer
    });
  } else {
    // Enable "Add to Cart" button if all required attributes have been selected
    $('button.add-to-cart, button.add-to-cart-global, button.update-cart-product-global').trigger('product:updateAddToCart', {
      product: response.product,
      $productContainer: $productContainer
    }).trigger('product:statusUpdate', response.product);
  } // Update attributes


  $productContainer.find('.main-attributes').empty().html(getAttributesHtml(response.product.attributes));
}
/**
 * @typespec UpdatedQuantity
 * @type Object
 * @property {boolean} selected - Whether the quantity has been selected
 * @property {string} value - The number of products to purchase
 * @property {string} url - Compiled URL that specifies variation attributes, product ID, options,
 *     etc.
 */

/**
 * Updates the quantity DOM elements post Ajax call
 * @param {UpdatedQuantity[]} quantities -
 * @param {jQuery} $productContainer - DOM container for a given product
 */


function updateQuantities(quantities, $productContainer) {
  if (!($productContainer.parent('.bonus-product-item').length > 0)) {
    var optionsHtml = quantities.map(function (quantity) {
      var selected = quantity.selected ? ' selected ' : '';
      return '<option value="' + quantity.value + '"  data-url="' + quantity.url + '"' + selected + '>' + quantity.value + '</option>';
    }).join('');
    getQuantitySelector($productContainer).empty().html(optionsHtml);
  }
}
/**
 * updates the product view when a product attribute is selected or deselected or when
 *         changing quantity
 * @param {string} selectedValueUrl - the Url for the selected variation value
 * @param {jQuery} $productContainer - DOM element for current product
 */


function attributeSelect(selectedValueUrl, $productContainer) {
  if (selectedValueUrl) {
    $('body').trigger('product:beforeAttributeSelect', {
      url: selectedValueUrl,
      container: $productContainer
    });
    $.ajax({
      url: selectedValueUrl,
      method: 'GET',
      success: function (data) {
        handleVariantResponse(data, $productContainer);
        updateOptions(data.product.options, $productContainer);
        updateQuantities(data.product.quantities, $productContainer);
        $('body').trigger('product:afterAttributeSelect', {
          data: data,
          container: $productContainer
        });
        $.spinner().stop();
      },
      error: function () {
        $.spinner().stop();
      }
    });
  }
}
/**
 * Retrieves url to use when adding a product to the cart
 *
 * @return {string} - The provided URL to use when adding a product to the cart
 */


function getAddToCartUrl() {
  return $('.add-to-cart-url').val();
}
/**
 * Parses the html for a modal window
 * @param {string} html - representing the body and footer of the modal window
 *
 * @return {Object} - Object with properties body and footer.
 */


function parseHtml(html) {
  var $html = $('<div>').append($.parseHTML(html));
  var body = $html.find('.choice-of-bonus-product');
  var footer = $html.find('.modal-footer').children();
  return {
    body: body,
    footer: footer
  };
}
/**
 * Retrieves url to use when adding a product to the cart
 *
 * @param {Object} data - data object used to fill in dynamic portions of the html
 */


function chooseBonusProducts(data) {
  $('.modal-body').spinner().start();

  if ($('#chooseBonusProductModal').length !== 0) {
    $('#chooseBonusProductModal').remove();
  }

  var bonusUrl;

  if (data.bonusChoiceRuleBased) {
    bonusUrl = data.showProductsUrlRuleBased;
  } else {
    bonusUrl = data.showProductsUrlListBased;
  }

  var htmlString = '<!-- Modal -->' + '<div class="modal fade" id="chooseBonusProductModal" role="dialog">' + '<div class="modal-dialog choose-bonus-product-dialog" ' + 'data-total-qty="' + data.maxBonusItems + '"' + 'data-UUID="' + data.uuid + '"' + 'data-pliUUID="' + data.pliUUID + '"' + 'data-addToCartUrl="' + data.addToCartUrl + '"' + 'data-pageStart="0"' + 'data-pageSize="' + data.pageSize + '"' + 'data-moreURL="' + data.showProductsUrlRuleBased + '"' + 'data-bonusChoiceRuleBased="' + data.bonusChoiceRuleBased + '">' + '<!-- Modal content-->' + '<div class="modal-content">' + '<div class="modal-header">' + '    <span class="">' + data.labels.selectprods + '</span>' + '    <button type="button" class="close pull-right" data-dismiss="modal">&times;</button>' + '</div>' + '<div class="modal-body"></div>' + '<div class="modal-footer"></div>' + '</div>' + '</div>' + '</div>';
  $('body').append(htmlString);
  $('.modal-body').spinner().start();
  $.ajax({
    url: bonusUrl,
    method: 'GET',
    dataType: 'html',
    success: function (html) {
      var parsedHtml = parseHtml(html);
      $('#chooseBonusProductModal .modal-body').empty();
      $('#chooseBonusProductModal .modal-body').html(parsedHtml.body);
      $('#chooseBonusProductModal .modal-footer').html(parsedHtml.footer);
      $('#chooseBonusProductModal').modal('show');
      $.spinner().stop();
    },
    error: function () {
      $.spinner().stop();
    }
  });
}
/**
 * Updates the Mini-Cart quantity value after the customer has pressed the "Add to Cart" button
 * @param {string} response - ajax response from clicking the add to cart button
 */


function handlePostCartAdd(response) {
  $('.minicart').trigger('count:update', response);
  var messageType = response.error ? 'alert-danger' : 'alert-success'; // show add to cart toast

  if (response.newBonusDiscountLineItem && Object.keys(response.newBonusDiscountLineItem).length !== 0) {
    chooseBonusProducts(response.newBonusDiscountLineItem);
  } else {
    if ($('.add-to-cart-messages').length === 0) {
      $('body').append('<div class="add-to-cart-messages"></div>');
    }

    $('.add-to-cart-messages').append('<div class="alert ' + messageType + ' add-to-basket-alert text-center" role="alert">' + response.message + '</div>');
    setTimeout(function () {
      $('.add-to-basket-alert').remove();
    }, 5000);
  }
}
/**
 * Retrieves the bundle product item ID's for the Controller to replace bundle master product
 * items with their selected variants
 *
 * @return {string[]} - List of selected bundle product item ID's
 */


function getChildProducts() {
  var childProducts = [];
  $('.bundle-item').each(function () {
    childProducts.push({
      pid: $(this).find('.product-id').text(),
      quantity: parseInt($(this).find('label.quantity').data('quantity'), 10)
    });
  });
  return childProducts.length ? JSON.stringify(childProducts) : [];
}
/**
 * Retrieve product options
 *
 * @param {jQuery} $productContainer - DOM element for current product
 * @return {string} - Product options and their selected values
 */


function getOptions($productContainer) {
  var options = $productContainer.find('.product-option').map(function () {
    var $elOption = $(this).find('.options-select');
    var urlValue = $elOption.val();
    var selectedValueId = $elOption.find('option[value="' + urlValue + '"]').data('value-id');
    return {
      optionId: $(this).data('option-id'),
      selectedValueId: selectedValueId
    };
  }).toArray();
  return JSON.stringify(options);
}

module.exports = {
  attributeSelect: attributeSelect,
  methods: {
    editBonusProducts: function (data) {
      chooseBonusProducts(data);
    }
  },
  colorAttribute: function () {
    $(document).on('click', '[data-attr="color"] a', function (e) {
      e.preventDefault();

      if ($(this).attr('disabled')) {
        return;
      }

      var $productContainer = $(this).closest('.set-item');

      if (!$productContainer.length) {
        $productContainer = $(this).closest('.product-detail');
      }

      attributeSelect(e.currentTarget.href, $productContainer);
    });
  },
  selectAttribute: function () {
    $(document).on('change', 'select[class*="select-"], .options-select', function (e) {
      e.preventDefault();
      var $productContainer = $(this).closest('.set-item');

      if (!$productContainer.length) {
        $productContainer = $(this).closest('.product-detail');
      }

      attributeSelect(e.currentTarget.value, $productContainer);
    });
  },
  availability: function () {
    $(document).on('change', '.quantity-select', function (e) {
      e.preventDefault();
      var $productContainer = $(this).closest('.product-detail');

      if (!$productContainer.length) {
        $productContainer = $(this).closest('.modal-content').find('.product-quickview');
      }

      if ($('.bundle-items', $productContainer).length === 0) {
        attributeSelect($(e.currentTarget).find('option:selected').data('url'), $productContainer);
      }
    });
  },
  addToCart: function () {
    $(document).on('click', 'button.add-to-cart, button.add-to-cart-global', function () {
      var addToCartUrl;
      var pid;
      var pidsObj;
      var setPids;
      $('body').trigger('product:beforeAddToCart', this);

      if ($('.set-items').length && $(this).hasClass('add-to-cart-global')) {
        setPids = [];
        $('.product-detail').each(function () {
          if (!$(this).hasClass('product-set-detail')) {
            setPids.push({
              pid: $(this).find('.product-id').text(),
              qty: $(this).find('.quantity-select').val(),
              options: getOptions($(this))
            });
          }
        });
        pidsObj = JSON.stringify(setPids);
      }

      pid = getPidValue($(this));
      var $productContainer = $(this).closest('.product-detail');

      if (!$productContainer.length) {
        $productContainer = $(this).closest('.quick-view-dialog').find('.product-detail');
      }

      addToCartUrl = getAddToCartUrl();
      var form = {
        pid: pid,
        pidsObj: pidsObj,
        childProducts: getChildProducts(),
        quantity: getQuantitySelected($(this))
      };

      if (!$('.bundle-item').length) {
        form.options = getOptions($productContainer);
      }

      $(this).trigger('updateAddToCartFormData', form);

      if (addToCartUrl) {
        $.ajax({
          url: addToCartUrl,
          method: 'POST',
          data: form,
          success: function (data) {
            handlePostCartAdd(data);
            $('body').trigger('product:afterAddToCart', data);
            $.spinner().stop();
          },
          error: function () {
            $.spinner().stop();
          }
        });
      }
    });
  },
  selectBonusProduct: function () {
    $(document).on('click', '.select-bonus-product', function () {
      var $choiceOfBonusProduct = $(this).parents('.choice-of-bonus-product');
      var pid = $(this).data('pid');
      var maxPids = $('.choose-bonus-product-dialog').data('total-qty');
      var submittedQty = parseInt($(this).parents('.choice-of-bonus-product').find('.bonus-quantity-select').val(), 10);
      var totalQty = 0;
      $.each($('#chooseBonusProductModal .selected-bonus-products .selected-pid'), function () {
        totalQty += $(this).data('qty');
      });
      totalQty += submittedQty;
      var optionID = $(this).parents('.choice-of-bonus-product').find('.product-option').data('option-id');
      var valueId = $(this).parents('.choice-of-bonus-product').find('.options-select option:selected').data('valueId');

      if (totalQty <= maxPids) {
        var selectedBonusProductHtml = '' + '<div class="selected-pid row" ' + 'data-pid="' + pid + '"' + 'data-qty="' + submittedQty + '"' + 'data-optionID="' + (optionID || '') + '"' + 'data-option-selected-value="' + (valueId || '') + '"' + '>' + '<div class="col-sm-11 col-9 bonus-product-name" >' + $choiceOfBonusProduct.find('.product-name').html() + '</div>' + '<div class="col-1"><i class="fa fa-times" aria-hidden="true"></i></div>' + '</div>';
        $('#chooseBonusProductModal .selected-bonus-products').append(selectedBonusProductHtml);
        $('.pre-cart-products').html(totalQty);
        $('.selected-bonus-products .bonus-summary').removeClass('alert-danger');
      } else {
        $('.selected-bonus-products .bonus-summary').addClass('alert-danger');
      }
    });
  },
  removeBonusProduct: function () {
    $(document).on('click', '.selected-pid', function () {
      $(this).remove();
      var $selected = $('#chooseBonusProductModal .selected-bonus-products .selected-pid');
      var count = 0;

      if ($selected.length) {
        $selected.each(function () {
          count += parseInt($(this).data('qty'), 10);
        });
      }

      $('.pre-cart-products').html(count);
      $('.selected-bonus-products .bonus-summary').removeClass('alert-danger');
    });
  },
  enableBonusProductSelection: function () {
    $('body').on('bonusproduct:updateSelectButton', function (e, response) {
      $('button.select-bonus-product', response.$productContainer).attr('disabled', !response.product.readyToOrder || !response.product.available);
      var pid = response.product.id;
      $('button.select-bonus-product').data('pid', pid);
    });
  },
  showMoreBonusProducts: function () {
    $(document).on('click', '.show-more-bonus-products', function () {
      var url = $(this).data('url');
      $('.modal-content').spinner().start();
      $.ajax({
        url: url,
        method: 'GET',
        success: function (html) {
          var parsedHtml = parseHtml(html);
          $('.modal-body').append(parsedHtml.body);
          $('.show-more-bonus-products:first').remove();
          $('.modal-content').spinner().stop();
        },
        error: function () {
          $('.modal-content').spinner().stop();
        }
      });
    });
  },
  addBonusProductsToCart: function () {
    $(document).on('click', '.add-bonus-products', function () {
      var $readyToOrderBonusProducts = $('.choose-bonus-product-dialog .selected-pid');
      var queryString = '?pids=';
      var url = $('.choose-bonus-product-dialog').data('addtocarturl');
      var pidsObject = {
        bonusProducts: []
      };
      $.each($readyToOrderBonusProducts, function () {
        var qtyOption = parseInt($(this).data('qty'), 10);
        var option = null;

        if (qtyOption > 0) {
          if ($(this).data('optionid') && $(this).data('option-selected-value')) {
            option = {};
            option.optionId = $(this).data('optionid');
            option.productId = $(this).data('pid');
            option.selectedValueId = $(this).data('option-selected-value');
          }

          pidsObject.bonusProducts.push({
            pid: $(this).data('pid'),
            qty: qtyOption,
            options: [option]
          });
          pidsObject.totalQty = parseInt($('.pre-cart-products').html(), 10);
        }
      });
      queryString += JSON.stringify(pidsObject);
      queryString = queryString + '&uuid=' + $('.choose-bonus-product-dialog').data('uuid');
      queryString = queryString + '&pliuuid=' + $('.choose-bonus-product-dialog').data('pliuuid');
      $.spinner().start();
      $.ajax({
        url: url + queryString,
        method: 'POST',
        success: function (data) {
          $.spinner().stop();

          if (data.error) {
            $('.error-choice-of-bonus-products').html(data.errorMessage);
          } else {
            $('.configure-bonus-product-attributes').html(data);
            $('.bonus-products-step2').removeClass('hidden-xl-down');
            $('#chooseBonusProductModal').modal('hide');

            if ($('.add-to-cart-messages').length === 0) {
              $('body').append('<div class="add-to-cart-messages"></div>');
            }

            $('.minicart-quantity').html(data.totalQty);
            $('.add-to-cart-messages').append('<div class="alert alert-success add-to-basket-alert text-center"' + ' role="alert">' + data.msgSuccess + '</div>');
            setTimeout(function () {
              $('.add-to-basket-alert').remove();

              if ($('.cart-page').length) {
                location.reload();
              }
            }, 3000);
          }
        },
        error: function () {
          $.spinner().stop();
        }
      });
    });
  },
  getPidValue: getPidValue
};

/***/ }),

/***/ "./cartridges/app_storefront_training/cartridge/client/default/js/product/quickView.js":
/*!*********************************************************************************************!*\
  !*** ./cartridges/app_storefront_training/cartridge/client/default/js/product/quickView.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base = __webpack_require__(/*! ./base */ "./cartridges/app_storefront_training/cartridge/client/default/js/product/base.js");
/**
 * Generates the modal window on the first call.
 *
 */


function getModalHtmlElement() {
  if ($('#quickViewModal').length !== 0) {
    $('#quickViewModal').remove();
  }

  var htmlString = '<!-- Modal -->' + '<div class="modal fade" id="quickViewModal" role="dialog">' + '<div class="modal-dialog quick-view-dialog">' + '<!-- Modal content-->' + '<div class="modal-content">' + '<div class="modal-header">' + '    <a class="full-pdp-link" href="">View Full Details</a>' + '    <button type="button" class="close pull-right" data-dismiss="modal">' + '        &times;' + '    </button>' + '</div>' + '<div class="modal-body"></div>' + '<div class="modal-footer"></div>' + '</div>' + '</div>' + '</div>';
  $('body').append(htmlString);
}
/**
 * @typedef {Object} QuickViewHtml
 * @property {string} body - Main Quick View body
 * @property {string} footer - Quick View footer content
 */

/**
 * Parse HTML code in Ajax response
 *
 * @param {string} html - Rendered HTML from quickview template
 * @return {QuickViewHtml} - QuickView content components
 */


function parseHtml(html) {
  var $html = $('<div>').append($.parseHTML(html));
  var body = $html.find('.product-quickview');
  var footer = $html.find('.modal-footer').children();
  return {
    body: body,
    footer: footer
  };
}
/**
 * replaces the content in the modal window on for the selected product variation.
 * @param {string} productUrl - url to be used for going to the product details page
 * @param {string} selectedValueUrl - url to be used to retrieve a new product model
 */


function fillModalElement(productUrl, selectedValueUrl) {
  $('.modal-body').spinner().start();
  $.ajax({
    url: selectedValueUrl,
    method: 'GET',
    dataType: 'html',
    success: function (html) {
      var parsedHtml = parseHtml(html);
      $('.modal-body').empty(); // $('.modal-body').html(html);

      $('.modal-body').html(parsedHtml.body);
      $('.modal-footer').html(parsedHtml.footer);
      $('#quickViewModal .full-pdp-link').attr('href', productUrl);
      $('#quickViewModal .size-chart').attr('href', productUrl);
      $('#quickViewModal').modal('show');
      $.spinner().stop();
    },
    error: function () {
      $.spinner().stop();
    }
  });
}

module.exports = {
  showQuickview: function () {
    $('body').on('click', '.quickview', function (e) {
      e.preventDefault();
      var selectedValueUrl = $(this).closest('a.quickview').attr('href');
      var productUrl = selectedValueUrl.replace('Product-ShowQuickView', 'Product-Show');
      $(e.target).trigger('quickview:show');
      getModalHtmlElement();
      fillModalElement(productUrl, selectedValueUrl);
    });
  },
  colorAttribute: base.colorAttribute,
  selectAttribute: base.selectAttribute,
  removeBonusProduct: base.removeBonusProduct,
  selectBonusProduct: base.selectBonusProduct,
  enableBonusProductSelection: base.enableBonusProductSelection,
  showMoreBonusProducts: base.showMoreBonusProducts,
  addBonusProductsToCart: base.addBonusProductsToCart,
  availability: base.availability,
  addToCart: base.addToCart,
  showSpinner: function () {
    $('body').on('product:beforeAddToCart', function (e, data) {
      $(data).closest('.modal-content').spinner().start();
    });
  },
  hideDialog: function () {
    $('body').on('product:afterAddToCart', function () {
      $('#quickViewModal').modal('hide');
    });
  },
  beforeUpdateAttribute: function () {
    $('body').on('product:beforeAttributeSelect', function () {
      $('.modal.show .modal-content').spinner().start();
    });
  },
  updateAttribute: function () {
    $('body').on('product:afterAttributeSelect', function (e, response) {
      if ($('.modal.show .product-quickview>.bundle-items').length) {
        $('.modal.show').find(response.container).data('pid', response.data.product.id);
        $('.modal.show').find(response.container).find('.product-id').text(response.data.product.id);
      } else if ($('.set-items').length) {
        response.container.find('.product-id').text(response.data.product.id);
      } else {
        $('.modal.show .product-quickview').data('pid', response.data.product.id);
        $('.modal.show .full-pdp-link').attr('href', response.data.product.selectedProductUrl);
      }
    });
  },
  updateAddToCart: function () {
    $('body').on('product:updateAddToCart', function (e, response) {
      // update local add to cart (for sets)
      $('button.add-to-cart', response.$productContainer).attr('disabled', !response.product.readyToOrder || !response.product.available); // update global add to cart (single products, bundles)

      var dialog = $(response.$productContainer).closest('.quick-view-dialog');
      $('.add-to-cart-global', dialog).attr('disabled', !$('.global-availability', dialog).data('ready-to-order') || !$('.global-availability', dialog).data('available'));
    });
  },
  updateAvailability: function () {
    $('body').on('product:updateAvailability', function (e, response) {
      // bundle individual products
      $('.product-availability', response.$productContainer).data('ready-to-order', response.product.readyToOrder).data('available', response.product.available).find('.availability-msg').empty().html(response.message);
      var dialog = $(response.$productContainer).closest('.quick-view-dialog');

      if ($('.product-availability', dialog).length) {
        // bundle all products
        var allAvailable = $('.product-availability', dialog).toArray().every(function (item) {
          return $(item).data('available');
        });
        var allReady = $('.product-availability', dialog).toArray().every(function (item) {
          return $(item).data('ready-to-order');
        });
        $('.global-availability', dialog).data('ready-to-order', allReady).data('available', allAvailable);
        $('.global-availability .availability-msg', dialog).empty().html(allReady ? response.message : response.resources.info_selectforstock);
      } else {
        // single product
        $('.global-availability', dialog).data('ready-to-order', response.product.readyToOrder).data('available', response.product.available).find('.availability-msg').empty().html(response.message);
      }
    });
  }
};

/***/ }),

/***/ "./cartridges/app_storefront_training/cartridge/client/default/js/productTile.js":
/*!***************************************************************************************!*\
  !*** ./cartridges/app_storefront_training/cartridge/client/default/js/productTile.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var processInclude = __webpack_require__(/*! ./util */ "./cartridges/app_storefront_training/cartridge/client/default/js/util.js");

$(document).ready(function () {
  processInclude(__webpack_require__(/*! ./product/quickView */ "./cartridges/app_storefront_training/cartridge/client/default/js/product/quickView.js"));
});

/***/ }),

/***/ "./cartridges/app_storefront_training/cartridge/client/default/js/util.js":
/*!********************************************************************************!*\
  !*** ./cartridges/app_storefront_training/cartridge/client/default/js/util.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (include) {
  if (typeof include === 'function') {
    include();
  } else if (typeof include === 'object') {
    Object.keys(include).forEach(function (key) {
      if (typeof include[key] === 'function') {
        include[key]();
      }
    });
  }
};

/***/ })

/******/ });
//# sourceMappingURL=productTile.js.map