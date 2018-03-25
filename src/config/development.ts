'use strict';

module.exports = {
    port: 8080,
    // url:'mongodb://localhost:27017/mynode',
    url: 'mongodb://xuqiangadmin:wojiaoxq251980@47.104.26.54:27017/wechat?authSource=admin',
    domain:'http://wechat.xuqiang.site',
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
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: '',
        db: 0
    },
    // 盲童微信签名配置
    wechat: {
        "appID": "wx6ec464893a6c970e",
        "appSecret": "40c415d310b81e73476a8d8a0673869a",
        "token": "wxexpress",
        "prefix": "https://api.weixin.qq.com/cgi-bin",
        "mpPrefix": "https://mp.weixin.qq.com/cgi-bin",
        "openPrefix": "https://open.weixin.qq.com",
    },
    wechatMenu: {
        "button": [
            {
                "type": "click",
                "name": "今日歌曲",
                "key": "V1001_TODAY_MUSIC"
            },
            {
                "name": "菜单",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "搜索",
                        "url": "http://wechat.xuqiang.site/#/"
                    },
                    {
                        "type": "click",
                        "name": "赞一下我们",
                        "key": "V1001_GOOD"
                    }
                ]
            }
        ]
    }
}