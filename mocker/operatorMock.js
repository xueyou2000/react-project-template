module.exports = {
    "POST /boss/boss-server/operatorInfo/findOperator": (req, res) => {
        let responseData = {
            status: '200',
            data: {
                id: 1,
                createTime: '2012-10-11',
                operatorNo: 'BOSS-OPER-000001',
                userName: 'XueYou',
                phone: '15521241541',
            },
        };

        return res.json(responseData);
    },
};