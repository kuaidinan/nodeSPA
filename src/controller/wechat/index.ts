'use strict';

import { Request,Response } from 'express';
import * as HttpRequest from "request";
var sha1 = require('sha1'); 
const config = require('config-lite')(__dirname);

var GET_TOKEN_API  = 'https://api.weixin.qq.com/cgi-bin/token?';

export default class Wechat {
    async getAccessToken() {
        return new Promise((resolve,reject) => {
            HttpRequest({
                method: "get",
                url: `${GET_TOKEN_API}grant_type=client_credential&appid=${config.wechat.appID}&secret=${config.wechat.appSecret}`,
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                var json:any;
                
                try {
                    json = JSON.parse(body);
                } catch(err) {
                    throw new error(err);
                }
                
                if (!json.access_token || json.errorcode) {
                    reject(json);
                    return;
                }
                json["timeStamp"] = Date.now();
                // redis.set(rAccessTokenKey, JSON.stringify(json));
                resolve(json);
            });
        })
    }
    async sign(req:Request,res:Response) {
        return new Promise(() => {
            var q = req.query;
            var token = config.wechat.token;  
            var signature = q.signature; //微信加密签名  
            var nonce = q.nonce; //随机数  
            var timestamp = q.timestamp; //时间戳
            var echostr = q.echostr; //随机字符串
            var str = [token, timestamp, nonce].sort().join('');
            var sha = sha1(str);  
            if (sha == signature) {
                res.send(echostr+'')
            }else{  
                res.send('err');  
            } 
        })
    }
}