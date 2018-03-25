"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require('config-lite')(__dirname);
class Auth {
    requestUrl(redirectUri) {
        const url = `${config.wechat.openPrefix}/connect/oauth2/authorize?appid=${config.wechat.appID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=snsapi_userinfo&state=STATEHello#wechat_redirect`;
        return url;
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map