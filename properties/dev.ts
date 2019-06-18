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
            if (details.family == "IPv4" && details.address.indexOf("127") === -1) {
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
        APPLICATION: packageInfo.application
    },
    devServer: {
        host: findHost(),
        port: 8280,
        hot: true,
        inline: true,
        open: true,
        disableHostCheck: true,
        quiet: true,
        openPage: "index.html",
        contentBase: path.join(__dirname, ".."),
        historyApiFallback: {
            index: "/",
            verbose: true
        },
        before(app) {
            apiMocker(app, path.resolve(__dirname, "../mocker/index.js"), {
                changeHost: true
            });
        }
        // proxy: [
        //     {
        //         target: "http://192.168.1.12:9001",
        //         context: [`/gateway/**`]
        //     },
        //     {
        //         target: "http://192.168.1.12:2002",
        //         context: [`/boss/**`]
        //     },
        //     {
        //         target: "http://192.168.1.12:6005",
        //         context: [`/boss-server/**`]
        //     },
        //     {
        //         target: "http://192.168.1.12:6014",
        //         context: [`/ticket/**`]
        //     },
        //     {
        //         target: "http://192.168.1.12:8080",
        //         context: [`/chat/**`]
        //     }
        // ]
    }
};

export default config;
