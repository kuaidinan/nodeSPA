'use strict';
module.exports = {
    port: 8080,
    url: 'mongodb://localhost:27017/mynode',
    session: {
        name: 'mynode',
        secret: 'mynode',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        }
    },
    redis: {
        port: 6379,
        host: '127.0.0.1',
        family: 4,
        password: '',
        db: 0
    },
    wechat: {
        "appID": "wx6ec464893a6c970e",
        "appSecret": "40c415d310b81e73476a8d8a0673869a",
        "token": "wxexpress",
        "prefix": "https://api.weixin.qq.com/cgi-bin/",
        "mpPrefix": "https://mp.weixin.qq.com/cgi-bin/"
    }
};
//# sourceMappingURL=development.js.map