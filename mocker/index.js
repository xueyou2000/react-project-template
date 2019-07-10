const delay = require("mocker-api/utils/delay");
const glob = require("glob");
const path = require("path");

let mocks = {};
glob.sync(path.join(__dirname, "./!(index).js")).forEach((filePath) => {
    const mock = require(filePath);
    mocks = { ...mocks, ...mock };
});

const proxy = {
    _proxy: {
        proxy: {
            "/boss/*": "http://192.168.1.12:2002",
            "/boss-server/*": "http://192.168.1.12:6005",
            "/ticket/*": "http://192.168.1.12:6014",
            "/chat/*": "http://192.168.1.12:8080"
        }
    },
    ...mocks
};

module.exports = delay(proxy, 1500);
