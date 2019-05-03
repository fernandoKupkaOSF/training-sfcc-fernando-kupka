const path = require("path");
const fse = require("fs-extra");
const glob = require("glob");
const minimatch = require("minimatch");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

class MiniCssExtractPluginCleanup {
    apply(compiler) {
        compiler.hooks.emit.tapAsync("MiniCssExtractPluginCleanup", (compilation, callback) => {
            Object.keys(compilation.assets)
                .filter(asset => {
                    return ["*/scss/**/*.js", "*/scss/**/*.js.map"].some(pattern => {
                        return minimatch(asset, pattern);
                    });
                })
                .forEach(asset => {
                    delete compilation.assets[asset];
                });

            callback();
        });
    }
}

class WebpackBundle {
    static forCartridge(cartridgeName) {
        const devMode = process.env.NODE_ENV !== "production";
        const cartridgesPath = path.resolve(__dirname, "cartridges");

        const clientPath = path.resolve(cartridgesPath, cartridgeName, "cartridge/client");
        if (!fse.existsSync(clientPath)) {
            return;
        }

        const bundle = {};
        bundle.entry = {};

        glob.sync(path.resolve(clientPath, "*", "js", "*.js")).forEach(f => {
            const key = path.join(path.dirname(path.relative(clientPath, f)), path.basename(f, ".js"));
            bundle.entry[key] = f;
        });

        glob.sync(path.resolve(clientPath, "*", "css", "**", "*.scss"))
            .filter(f => !path.basename(f).startsWith("_"))
            .forEach(f => {
                const key = path.join(path.dirname(path.relative(clientPath, f)), path.basename(f, ".scss"));
                bundle.entry[key] = f;
            });

        bundle.output = {
            path: path.resolve(cartridgesPath, cartridgeName, "cartridge/static"),
            filename: "[name].js"
        };

        bundle.module = {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: { cacheDirectory: true }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: "css-loader", options: { url: false, sourceMap: devMode } },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: [
                                    path.resolve(__dirname, "node_modules"),
                                    path.resolve(__dirname, "cartridges")
                                ],
                                sourceMap: devMode
                            }
                        }
                    ]
                }
            ]
        };

        bundle.plugins = [
            new CleanWebpackPlugin(["*/css", "*/js"], {
                root: path.resolve(cartridgesPath, cartridgeName, "cartridge/static"),
                verbose: false
            }),
            new MiniCssExtractPlugin(),
            new MiniCssExtractPluginCleanup()
        ];

        if (devMode) {
            bundle.mode = "development";
            bundle.devtool = "source-map";
        } else {
            bundle.mode = "production";
            bundle.devtool = false;
            bundle.optimization = {
                minimizer: [
                    new UglifyJsPlugin({
                        cache: true,
                        parallel: true,
                        sourceMap: false
                    }),
                    new OptimizeCSSAssetsPlugin({})
                ]
            };
        }

        return bundle;
    }
}

module.exports = [WebpackBundle.forCartridge("app_storefront_training")];
