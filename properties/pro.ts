import path from "path";
import { Configuration } from "./index";
import packageInfo from "../package.json";

const config: Configuration = {
    output: path.join(__dirname, "../dist"),
    assetsPublicPath: "/",
    filename: "js/[name].[contenthash:5].js",
    chunkFilename: "js/[name].[contenthash:5].js",
    devtool: false,
    variable: {
        NODE_ENV: "production",
        VERSION: packageInfo.version,
        NAME: packageInfo.title,
        APPLICATION: packageInfo.application
    },
    devServer: {}
};

export default config;
