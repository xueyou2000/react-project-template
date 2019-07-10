module.exports = {
    "POST /boss/redis/dict/findDictsByCodes": (req, res) => {
        let responseData = {
            status: '200',
            data: {
                ENABLE_OR_UNENABLE: {
                    code: "ENABLE_OR_UNENABLE",
                    name: "ENABLE_OR_UNENABLE",
                    remark: "ENABLE_OR_UNENABLE",
                    dictionaries: [
                        {
                            color: "#666666",
                            key: "ENABLE",
                            order: 1,
                            status: "TRUE",
                            value: "启用",
                        },
                        {
                            color: "#666666",
                            key: "UNENABLE",
                            order: 2,
                            status: "TRUE",
                            value: "禁用"
                        },
                    ],
                },
            },
        };

        return res.json(responseData);
    }
};