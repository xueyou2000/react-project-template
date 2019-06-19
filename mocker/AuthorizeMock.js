module.exports = {
    "POST /boss/auth": (req, res) => {
        const { username, password } = req.body;
        let responseData;

        if (username === "admin" && password === "123456") {
            responseData = {
                status: "200",
                data: {
                    token:
                        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsIm93bmVyUm9sZSI6IkJPU1MiLCJ1c2Vybm8iOiJPUEVSLTAwMDAwMDAwMDAwMDAwMDAwMDAxIiwiaWZCYXNlIjoiVFJVRSIsImlkIjozMSwiZXhwIjoxNTYwOTkxNDg4LCJpYXQiOjE1NjA5MDUwODh9.ZA_BHqPe3J6OwsPspmYyBNU2FCNr1-3ab7PMLfzdUfWOLBQ9YA6yutxG9CTZRoNUd-itmMqS28lat9P237_RkQ"
                }
            };
        } else {
            responseData = {
                status: "WIFI-000000022",
                msg: "用户名或密码错误"
            };
        }

        return res.json(responseData);
    }
};
