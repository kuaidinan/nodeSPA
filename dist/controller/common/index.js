'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require('ioredis');
const redis = new Redis();
const config = require('config-lite')(__dirname);
const utils_1 = require("../../common/utils");
const index_1 = require("../wechat/index");
function updateAccessToken() {
    new Promise((resolve, reject) => {
        utils_1.getRedis(config.wechat.token)
            .then((res) => {
            if (res) {
                resolve(res);
            }
            else {
                new index_1.default().getAccessToken().then((res) => {
                    utils_1.saveRedis(config.wechat.token, res.access_token, 100)
                        .then((res) => {
                        console.log('res', res);
                        resolve(res);
                    }).catch((error) => {
                        reject(error);
                        throw new Error(error);
                    });
                });
            }
        }).catch((error) => {
            reject(error);
            throw new Error(error);
        });
    });
}
exports.updateAccessToken = updateAccessToken;
//# sourceMappingURL=index.js.map