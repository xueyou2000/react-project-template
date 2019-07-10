import apiMocker from "mocker-api";
import os from "os";
import path from "path";
import packageInfo from "../package.json";
import { Configuration } from "./index";

function findHost() {
    var ifaces = os.networkInterfaces();
    var host = null;
    for (var dev in ifaces) {
        ifaces[dev].forEach(function(details, alias) {
            if (details.family == "IPv4" && details.address.indexOf("192") !== -1) {
                host = details.address;
            }
        });
    }

    return host;
}

const config: Configuration = {
    output: path.join(__dirname, "../dist"),
    assetsPublicPath: "/",
    filename: "js/[name].js",
    chunkFilename: "js/[name].js",
    devtool: "eval-source-map",
    variable: {
        NODE_ENV: "development",
        VERSION: packageInfo.version,
        NAME: packageInfo.title,
        APPLICATION: packageInfo.application,
    },
    devServer: {
        host: findHost(),
        port: 8282,
        hot: true,
        inline: true,
        open: true,
        disableHostCheck: true,
        quiet: true,
        openPage: "index.html",
        contentBase: path.join(__dirname, ".."),
        historyApiFallback: {
            index: "/",
            verbose: true,
        },
        proxy: [
            {
                target: "http://192.168.1.13:2002",
                context: [`/boss/**`],
            },
            {
                target: "http://192.168.1.13:6005",
                context: [`/boss-server/**`],
            },
            {
                target: "http://192.168.1.13:2006",
                context: [`/customer/**`],
            },
            {
                target: "http://192.168.1.13:6012",
                context: [`/customer-server/**`],
            },
        ],
        before(app) {
            apiMocker(app, path.resolve(__dirname, "../mocker/index.js"), {
                changeHost: true,
            });
        },
    },
};

export default config;
