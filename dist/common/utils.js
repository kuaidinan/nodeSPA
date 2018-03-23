"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const config = require('config-lite')(__dirname);
const sha1 = require('sha1');
const Redis = require('ioredis');
const redis = new Redis();
function sign(req, res) {
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
}
exports.sign = sign;
function fetch(option) {
    return new Promise((resolve, reject) => {
        request(Object.assign({}, option), (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(body);
        });
    });
}
exports.fetch = fetch;
function saveRedis(keyName, keyValue, expireat) {
    return new Promise((resolve, reject) => {
        redis.set(keyName, keyValue, 'EX', expireat, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}
exports.saveRedis = saveRedis;
function getRedis(keyName) {
    return new Promise((resolve, reject) => {
        redis.get(keyName, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}
exports.getRedis = getRedis;
//# sourceMappingURL=utils.js.map