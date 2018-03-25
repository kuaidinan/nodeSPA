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
const index_1 = require("../common/index");
const auth_1 = require("../../common/auth");
const iconv = require('iconv-lite');
const sha1 = require('sha1');
const config = require('config-lite')(__dirname);
const auth = new auth_1.default();
class Wechat {
    getAccessToken() {
        return new Promise((resolve, reject) => {
            utils_1.fetch({
                method: "get",
                url: `${config.wechat.prefix}/token?grant_type=client_credential&appid=${config.wechat.appID}&secret=${config.wechat.appSecret}`,
            }).then((result) => {
                var json;
                json = JSON.parse(result);
                if (!json.access_token || json.errorcode) {
                    reject(json);
                    return;
                }
                json["timeStamp"] = Date.now();
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
            const token = yield index_1.getAccessToken();
            utils_1.fetch({
                method: 'get',
                url: `${config.wechat.prefix}/menu/get?access_token=${token}`
            }).then((result) => {
                res.send(result);
                return Promise.resolve(result);
            }).catch((error) => {
                return Promise.reject(error);
            });
        });
    }
    createMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield index_1.getAccessToken();
            return utils_1.fetch({
                method: 'post',
                url: `${config.wechat.prefix}/menu/create?access_token=${token}`,
                json: true,
                body: config.wechatMenu
            }).then((result) => {
                return Promise.resolve(result);
            }).catch((error) => {
                return Promise.reject(error);
            });
        });
    }
    requestAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const redirectUrl = auth.requestUrl(config.domain + '/api/wechat/callBack');
            console.log('redirectUrl', redirectUrl);
            res.redirect(redirectUrl);
        });
    }
    callBack(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.redirect('/static/');
        });
    }
}
exports.default = Wechat;
function startCreateMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield new Wechat().createMenu();
    });
}
exports.startCreateMenu = startCreateMenu;
//# sourceMappingURL=index.js.map