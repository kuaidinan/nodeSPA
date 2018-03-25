const config = require('config-lite')(__dirname);
export default class Auth {
    requestUrl(redirectUri:string) {
        const url = `${config.wechat.openPrefix}/connect/oauth2/authorize?appid=${config.wechat.appID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=snsapi_userinfo&state=STATEHello#wechat_redirect`;
        return url
    }
}