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
    wechat: {
        "appID": "wx1d4d702ebd125200",
        "appSecret": "b7b2a8a128b2d3f1bbb477fd4cabe79d",
        "token": "wxexpress",
        "prefix": "https://api.weixin.qq.com/cgi-bin/",
        "mpPrefix": "https://mp.weixin.qq.com/cgi-bin/"
    }
};
//# sourceMappingURL=development.1.js.map