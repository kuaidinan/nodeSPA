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
const utils_1 = require("../../common/utils");
var sha1 = require('sha1');
const config = require('config-lite')(__dirname);
class Wechat {
    getAccessToken() {
        return new Promise((resolve, reject) => {
            utils_1.fetch({
                method: "get",
                url: `${config.wechat.prefix}/token?grant_type=client_credential&appid=${config.wechat.appID}&secret=${config.wechat.appSecret}`,
            }).then((result) => {
                console.log('result', result);
                console.log(`${config.wechat.prefix}/grant_type=client_credential&appid=${config.wechat.appID}&secret=${config.wechat.appSecret}`);
                var json;
                json = JSON.parse(result);
                if (!json.access_token || json.errorcode) {
                    reject(json);
                    return;
                }
                json["timeStamp"] = Date.now();
                console.log('123', json);
                resolve(json);
            }).catch((error) => {
                reject(error);
                throw new Error(error);
            });
        });
    }
    sign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.sign(req, res);
        });
    }
    getMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield updateAccessToken();
            console.log('token', token);
        });
    }
}
exports.default = Wechat;
function updateAccessToken() {
    return new Promise((resolve, reject) => {
        utils_1.getRedis(config.wechat.token)
            .then((res) => {
            resolve(res);
        }).catch((error) => {
            reject(error);
            throw new Error(error);
        });
    }).then(res => new Promise((resolve, reject) => {
        if (res) {
            resolve(res);
        }
        else {
            new Wechat().getAccessToken().then((res) => {
                utils_1.saveRedis(config.wechat.token, res.access_token, 100)
                    .then((success) => {
                    resolve(res.access_token);
                }).catch((error) => {
                    reject(error);
                    throw new Error(error);
                });
            }).catch((error) => {
                console.log('error2', error);
                reject(error);
                throw new Error(error);
            });
        }
    })).catch(error => {
        throw new Error(error);
    });
}
exports.updateAccessToken = updateAccessToken;
//# sourceMappingURL=index.js.map