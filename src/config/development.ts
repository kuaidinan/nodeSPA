'use strict';

module.exports = {
    port:8080,
    // url:'mongodb://localhost:27017/mynode',
    url:'mongodb://xuqiangadmin:wojiaoxq251980@47.104.26.54:27017/wechat?authSource=admin',
    session: {
        name:'mynode',
        secret:'mynode',
        cookie:{
            httpOnly: true,
            secure:   false,
            maxAge:   365*24*60*60*1000,
        }
    },
    redis:{
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        password: '',
        db: 0
    },
    // 盲童微信签名配置
    wechat : {  
        "appID": "wx6ec464893a6c970e",  
        "appSecret": "40c415d310b81e73476a8d8a0673869a",  
        "token": "wxexpress",  
        "prefix": "https://api.weixin.qq.com/cgi-bin",  
        "mpPrefix": "https://mp.weixin.qq.com/cgi-bin"  
    }
}