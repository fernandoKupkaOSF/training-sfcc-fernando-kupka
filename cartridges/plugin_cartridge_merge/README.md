# plugin_cartridge_merge: Storefront Reference Architecture (SFRA)
This repository provides a sample customization plugin. This plugin makes it easy to use multiple SFRA plugins within a single storefront.

## Supported Plugins
The following optional SFRA plugins are supported: 

* [plugin-applepay](https://github.com/SalesforceCommerceCloud/plugin-applepay)
* [plugin_datadownload](https://github.com/SalesforceCommerceCloud/plugin_datadownload)
* [plugin_instorepickup](https://github.com/SalesforceCommerceCloud/plugin_instorepickup)
* [plugin_giftregistry](https://github.com/SalesforceCommerceCloud/plugin_giftregistry)
* [plugin_productcompare](https://github.com/SalesforceCommerceCloud/plugin_productcompare)
* [plugin_wishlist](https://github.com/SalesforceCommerceCloud/plugin_wishlist)


## Overview
This repository provides a customization cartridge (also named plugin_cartridge_merge) that makes it easy to use the supported plugins. 

In SFRA, plugin cartridges are developed against the app_storefront_base cartridge. They are individually tested against the base, but not against each other.

In many cases, the cartridges contain conflicting code. For example, the following template

`
cartridge/templates/default/product/components/productAvailability.isml
`

is used in three plugin cartridges:

* plugin_giftregistry
* plugin_instorepickup
* plugin_wishlists

Previously, to explore the functionality of all three cartridges, you had two options:

1. *Repeatedly modify the cartridge path*: you could add or remove cartridges from the cartidge path, exploring each cartridge individually, but not together.
2. *Develop your own customization cartridge*: you could develop your own customization cartridge that resolves all of the underlying conflicts, and you could add your customization cartridge to the cartridge path (in the leftmost position, so that it is found first).

Both options had important disadvantages. The first made it impossible to use all of the cartridges at the same time. The second required a significant amount of development time and effort &mdash; effort that could seem excessive if your goal was to simply run the SFRA demonstration storefront and explore the features. 

Now, you can save time by using the plugin_cartridge_merge cartridge to resolve these conflicts for you. In addition, you can quickly and easily enable and disable supported cartridges in Business Manager. 

The plugin_cartridge_merge plugin provides metadata you can load into Business Manager. This metadata defines site preferences that indicate whether you want to enable or disable specific supported cartridges. As before, you must still make changes to the cartridge path to enable and disable cartridges. However, by setting the site preferences, you enable the plugin_cartridge_merge cartridge to detect the value of each site preference at runtime and conditionally execute code that is in sync with the cartridge path. 

In summary, the plugin_cartridge_merge plugin provides several benefits:

* Merchants can easily explore a wide range of optional SFRA features.
* Merchants can quickly activate and deactivate individual features.
* Developers can use the provided customization cartridge (plugin_cartridge_merge) as an extended example of how to implement a customization cartridge for a production storefront. 


# Cartridge Path Considerations
The plugin_cartridge_merge plugin requires the app_storefront_base cartridge and several other plugin cartridges. Set your cartridge path to use the following cartridges in the specified order:

`
plugin_cartridge_merge:plugin_datadownload:plugin_wishlists:plugin_giftregistry:lib_productlist:plugin_instorepickup:plugin_sitemap:plugin_applepay:plugin_productcompare:app_storefront_base
`

To use a supported plugin, you must add the cartridge to the cartridge path and enable the corresponding site preference. To disable a plugin, you must remove the cartridge from the cartridge path and disable the site preference. If the site preferences and cartridge path are not in sync, you can get compilation and runtime errors. 

**Note**: The plugin_wishlists and plugin_giftregistry cartridges both depend on the lib_productlist cartridge, so you must place the lib_productlist cartridge to the right of these other two cartridges in the cartridge path. And if you do not want to use either the plugin_wishlists plugin or the plugin_giftregistry plugin, you must remove all three cartridges from the cartridge path.


# Getting Started
These instructions assume that you have already cloned the following repositories:

* [storefront-reference-architecture](https://github.com/SalesforceCommerceCloud/storefront-reference-architecture)
* [plugin-applepay](https://github.com/SalesforceCommerceCloud/plugin-applepay)
* [plugin_datadownload](https://github.com/SalesforceCommerceCloud/plugin_datadownload)
* [plugin_instorepickup](https://github.com/SalesforceCommerceCloud/plugin_instorepickup)
* [plugin_giftregistry](https://github.com/SalesforceCommerceCloud/plugin_giftregistry)
* [plugin_productcompare](https://github.com/SalesforceCommerceCloud/plugin_productcompare)
* [plugin_wishlist](https://github.com/SalesforceCommerceCloud/plugin_wishlist)

They further assume that you have followed the getting started instructions for each repository, and that you have uploaded all of the corresponding cartridges into your sandbox.

1. Clone this repository. (The name of the top-level folder is plugin_cartridge_merge. The top-level folder should be a peer of the the top-level folders of the other SFRA repositories.)
2. Open a command prompt to the top-level folder in the plugin_cartridge_merge repository.
3. Edit the `paths` property in the `package.json` file. This property should contain relative paths to the local directories containing the Storefront Reference Architecture repository and the repositories of the other supported plugins. For example:
```
  "paths": {
    "base": "../storefront-reference-architecture/cartridges/app_storefront_base/",
    "applepay": "../plugin-applepay/cartridges/plugin_applepay/",
    "datadownload":"../plugin_datadownload/cartridges/plugin_datadownload",
    "giftregistry":"../plugin_giftregistry/cartridges/plugin_giftregistry",
    "instorepickup": "../plugin_instorepickup/cartridges/plugin_instorepickup/",
    "productcompare":"../plugin_productcompare/cartridges/plugin_productcompare",
    "sitemap":"../plugin_sitemap/cartridges/plugin_sitemap",
    "wishlist":"../plugin_wishlists/cartridges/plugin_wishlists"
  }
```
**Note**: If you don't want to use a supported plugin, remove the reference to the plugin from the `paths` property.
4. Enter the following command: `npm install`. (This command installs all of the package dependencies required for this plugin.)
5. Enter the following command: `npm run compile:js`. 
6. Enter the following command: `npm run compile:scss`.
7. Create a `dw.json` file in the root directory of the plugin_cartridge_merge repository:

```
{
    "hostname": "your-sandbox-hostname.demandware.net",
    "username": "yourlogin",
    "password": "yourpwd",
    "code-version": "version_to_upload_to"
}
```
8. Enter the following command: `npm run uploadCartridge`.


## Install Metadata 
The `metaDataImport.xml` file contains definitions for site preferences used with the plugin_cartridge_merge cartridge. This file is located in the top-level folder of the plugin_cartridge_merge repository. 

### Site Preferences
The following site preferences are defined in the import file:

* SFRA - Enable Apple Pay 
* SFRA - Enable Data Download
* SFRA - Enable Gift Registry
* SFRA - Enable In Store Pickup
* SFRA - Enable Product Compare
* SFRA - Enable Wishlist

Each of these preferences sets a flag. The value of these settings indicate which plugin cartridges you want to enable when you run the SFRA demonstration storefront.


### Import the Metadata File 

1. In Business Manager, select **Administration >  Site Development >  Import & Export.**
3. In the Import & Export Files section, click **Upload**.
4. In the Upload Import Files section, click **Choose File**.
5. Select the `plugin_cartridge_merge/metaDataImport.xml` file.
6. Click **Upload**.
7. Select **Administration >  Site Development >  Import & Export.** 
8. In the Meta Data section, click **Import**. 
9. On the System Type Extension Import - Select File page, select `metaDataImport.xml`.
10. Click **Next >>**. The system validates the file.
11. On the System Type Extension Import - Validate File page, select **Import**. 

The imported site preferences are part of the SFRA Unified Feature Cartridge group.


## Set Site Preferences 
By default, all of the site preferences in the SFRA Unified Feature Cartridge group are enabled. If you want to disable a supported plugin, you can disable the setting for the corresponding site preference. 

To modify a site preference:

1. In Business Manager, select a site.
2. Select **Merchant Tools > Site Preferences > Custom Preferences**. 
3. Click **SFRA Unified Feature Cartridge**.
4. Specify a value for each site preference. (Set "Yes" to enable and "No" to disable.)
5. Click **Save**.

If you disable a supported plugin, remove the corresponding cartridge from the cartridge path, and remove the repository's path from the `package.json` file.

## Verify Your Configuration
To ensure that you have correctly installed and configured the plugin_cartridge_merge plugin, you can:

1. In Business Manager, select a site (RefArch or RefArchGlobal).
2. Click Storefront.
3. Visit various product detail pages, and select variations, and look for Wishlist buttons, Gift Registry buttons, and Store Pickup buttons. 

The presence of these buttons indicates that the corresponding plugins are installed and operational.  




