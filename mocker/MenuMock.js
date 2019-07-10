module.exports = {
    "POST /boss/boss-server/permissions/find": (req, res) => {
        let responseData = {
            status: "200",
            data: [
                {
                    name: "首页",
                    path: "/welcome",
                },
                {
                    name: "系统管理",
                    path: "/system",
                    children: [
                        {
                            name: "菜单管理",
                            path: "/system/menu",
                        },
                        {
                            name: "公众号配置",
                            path: "/system/wechat",
                        },
                    ],
                },
                {
                    name: "账户管理",
                    path: "/account",
                    children: [
                        {
                            name: "账户查询",
                            path: "/account/query",
                        },
                    ],
                },
                {
                    name: "商户管理",
                    path: "/customer",
                    children: [
                        {
                            name: "商户查询",
                            path: "/customer/query",
                        },
                        {
                            name: "商户开通",
                            path: "/customer/create",
                        },
                    ],
                },
                {
                    name: "订单管理",
                    path: "/order",
                    children: [
                        {
                            name: "代付订单",
                            path: "/order/dpay-order",
                        },
                        {
                            name: "交易订单",
                            path: "/order/trans-order",
                        },
                    ],
                },
            ],
        };

        return res.json(responseData);
    },
    "POST /boss/boss-server/menu/findByPage/:pageNum/:pageSize": (req, res) => {
        let { pageNum, pageSize } = req.params;
        pageNum = parseInt(pageNum);
        pageSize = parseInt(pageSize);

        let responseData = {
            status: "200",
            data: {
                pageNum,
                pageSize,
                total: 15,
                hasPreviousPage: pageNum === 1 ? false : true,
                hasNextPage: pageNum === Math.ceil(15 / pageSize) ? false : true,
                list:
                    pageNum * pageSize > 15
                        ? []
                        : [
                              {
                                  createTime: "2019-03-30 11:10:46",
                                  displayOrder: 0,
                                  id: 1,
                                  label: "首页",
                                  levels: 1,
                                  name: "首页",
                                  optimistic: null,
                                  parentId: 0,
                                  path: "welcome",
                                  status: "ENABLE",
                                  statusLabel: "启用",
                              },
                              {
                                  createTime: "2019-04-03 16:02:27",
                                  displayOrder: 0,
                                  id: 28,
                                  label: null,
                                  levels: 2,
                                  name: "公告管理",
                                  optimistic: null,
                                  parentId: 2,
                                  path: "notice/query",
                                  status: "ENABLE",
                                  statusLabel: "启用",
                              },
                              {
                                  createTime: "2019-04-03 11:53:41",
                                  displayOrder: 0,
                                  id: 27,
                                  label: null,
                                  levels: 2,
                                  name: "民警编辑",
                                  optimistic: null,
                                  parentId: 3,
                                  path: "policeInfo/query",
                                  status: "ENABLE",
                                  statusLabel: "启用",
                              },
                          ],
            },
        };

        return res.json(responseData);
    },
    "POST /boss/boss-server/menu/add": (req, res) => {
        const { name, path } = req.body;
        if (name === "测试菜单") {
            responseData = {
                status: "200",
                msg: "添加成功",
            };
        } else {
            responseData = {
                status: "YL-00000013",
                msg: "菜单名称必须为: 测试菜单",
            };
        }

        return res.json(responseData);
    },
};
