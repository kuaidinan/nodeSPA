'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpRequest = require("request");
var sha1 = require('sha1');
const config = require('config-lite')(__dirname);
var GET_TOKEN_API = 'https://api.weixin.qq.com/cgi-bin/token?';
class Wechat {
    tt(params) {
        console.log('123123123123123123');
        return 2;
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                HttpRequest({
                    method: "get",
                    url: `${GET_TOKEN_API}grant_type=client_credential&appid=${config.wechat.appID}&secret=${config.wechat.appSecret}`,
                }, (error, response, body) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    var json;
                    try {
                        json = JSON.parse(body);
                    }
                    catch (err) {
                        throw new error(err);
                    }
                    if (!json.access_token || json.errorcode) {
                        reject(json);
                        return;
                    }
                    json["timeStamp"] = Date.now();
                    resolve(json);
                });
            });
        });
    }
    sign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(() => {
                var q = req.query;
                var token = config.wechat.token;
                var signature = q.signature;
                var nonce = q.nonce;
                var timestamp = q.timestamp;
                var echostr = q.echostr;
                var str = [token, timestamp, nonce].sort().join('');
                var sha = sha1(str);
                if (sha == signature) {
                    res.send(echostr + '');
                }
                else {
                    res.send('err');
                }
            });
        });
    }
    getMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('this', new Wechat().tt(1));
        });
    }
}
exports.default = Wechat;
//# sourceMappingURL=index.js.map