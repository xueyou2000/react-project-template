import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import HardSourceWebpackPlugin from "hard-source-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import Path from "path";
import Webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ManifestPlugin from "webpack-manifest-plugin";
import { Configuration, ConfigurationFactory, WebpackBuildEnvironmentEnum } from "./properties";
const packerJson = require("./package.json");

export default () => {
    const env = process.env.WEBPACK_ENV as WebpackBuildEnvironmentEnum;
    const config = ConfigurationFactory(env);
    const devMode = env === WebpackBuildEnvironmentEnum.dev;

    const webpackConfig: Webpack.Configuration & { devServer: any } = {
        entry: "./src/WebApplication/WebApplicationInitialize.tsx",
        devtool: config.devtool,
        devServer: config.devServer,
        mode: devMode ? "development" : "production",
        output: {
            path: config.output,
            filename: config.filename,
            publicPath: config.assetsPublicPath
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            alias: {
                "@": Path.join(__dirname, "src"),
                "utils-hooks$": Path.resolve(__dirname, "node_modules/utils-hooks")
            }
        },
        externals: {
            react: "React",
            "react-dom": "ReactDOM"
        },
        module: {
            rules: [
                {
                    test: /\.(ts)x?$/,
                    include: [/src/],
                    use: {
                        loader: "awesome-typescript-loader",
                        options: {
                            useCache: true,
                            reportFiles: ["src/**/*.{ts,tsx}"],
                            cacheDirectory: "./node_modules/.awcache,",
                            forceIsolatedModules: true
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: devMode ? ["style-loader", "css-loader"] : [MiniCssExtractPlugin.loader, require.resolve("css-loader")]
                },
                {
                    test: /\.scss$$/,
                    include: [/src/],
                    use: devMode ? ["style-loader", "css-loader", "sass-loader"] : [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 100,
                        name: "images/[name].[hash:5].[ext]"
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 100,
                        name: "media/[name].[hash:5].[ext]"
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: "url-loader",
                    options: {
                        limit: 100,
                        name: "fonts/[name].[hash:5].[ext]"
                    }
                }
            ]
        },
        optimization: {
            removeEmptyChunks: true,
            removeAvailableModules: true,
            minimize: env === WebpackBuildEnvironmentEnum.prod,
            splitChunks: {
                cacheGroups: {
                    components: {
                        test: /(xy-(\w+)|utils-|validate-)/,
                        name: "components",
                        chunks: "all",
                        enforce: true,
                        priority: 2
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                        priority: -10
                    }
                }
            }
        },
        plugins: GetPlugins(config, devMode)
    };

    return webpackConfig;
};

/**
 * 获取Webpack插件
 * @param config    配置
 * @param devMode   是否开发模式
 */
function GetPlugins(config: Configuration, devMode: boolean): Webpack.Plugin[] {
    let environmentPlugins: Webpack.Plugin[] = [];
    const basePlugins: Webpack.Plugin[] = [
        WebpackVariablePlugin(config),
        new CaseSensitivePathsPlugin(),
        new HardSourceWebpackPlugin(),
        new CopyWebpackPlugin([{ from: Path.resolve("static/**/*"), to: Path.resolve(config.output) }]),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true,
            title: packerJson.title,
            assetsPublicPath: config.assetsPublicPath
        })
    ];

    if (devMode) {
        environmentPlugins = [new Webpack.HotModuleReplacementPlugin(), new FriendlyErrorsWebpackPlugin()];
    } else {
        environmentPlugins = [
            new CleanWebpackPlugin(),
            new ManifestPlugin(),
            new Webpack.HashedModuleIdsPlugin(),
            new MiniCssExtractPlugin({ filename: "css/[name].[contenthash:5].css" }),
            new OptimizeCSSAssetsPlugin(),
            new Webpack.optimize.ModuleConcatenationPlugin(),
            new BundleAnalyzerPlugin()
        ];
    }

    return basePlugins.concat(environmentPlugins);
}

/**
 * 创建webpack变量插件
 * @param {*} config
 */
function WebpackVariablePlugin(config: Configuration) {
    const variable: any = {};
    for (let variableName in config.variable) {
        variable[`process.env.${variableName}`] = JSON.stringify(config.variable[variableName]);
    }
    return new Webpack.DefinePlugin(variable);
}
