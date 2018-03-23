'use strict';

import { Request,Response } from 'express';
import * as HttpRequest from "request";
import { sign,fetch,saveRedis,getRedis } from '../../common/utils';
import { resolve } from 'path';
var sha1 = require('sha1'); 
const config = require('config-lite')(__dirname);

export default class Wechat {
    getAccessToken() {
        return new Promise((resolve,reject) => {
            fetch({
                method: "get",
                url: `${config.wechat.prefix}/token?grant_type=client_credential&appid=${config.wechat.appID}&secret=${config.wechat.appSecret}`,
            }).then((result:any) => {
                var json:any;
                
                json = JSON.parse(result);
                if (!json.access_token || json.errorcode) {
                    reject(json);
                    return;
                }
                json["timeStamp"] = Date.now();
                resolve(json);
            }).catch((error) => {
                reject(error)
                throw new Error(error)
            })
        })
    }
    async sign(req:Request,res:Response) {
        sign(req,res)
    }
    public async getMenu(req:Request,res:Response) {
        const token = await getAccessToken()
        fetch({
            method:'get',
            url:`${config.wechat.prefix}/menu/get?access_token=${token}`
        }).then((result:any) => {
            res.send(result)
            return Promise.resolve(result)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
    public async createMenu(req:Request,res:Response) {
        console.log('123')
        const token = await getAccessToken()
        fetch({
            method:'post',
            url:`${config.wechat.prefix}/menu/create?access_token=${token}`,
            body: {
                "button":[
                {    
                     "type":"click",
                     "name":"今日歌曲",
                     "key":"V1001_TODAY_MUSIC"
                 },
                 {
                      "name":"菜单",
                      "sub_button":[
                      {    
                          "type":"view",
                          "name":"搜索",
                          "url":"http://www.soso.com/"
                       },
                       {
                            "type":"miniprogram",
                            "name":"wxa",
                            "url":"http://mp.weixin.qq.com",
                            "appid":"wx286b93c14bbf93aa",
                            "pagepath":"pages/lunar/index"
                        },
                       {
                          "type":"click",
                          "name":"赞一下我们",
                          "key":"V1001_GOOD"
                       }]
                  }]
            }
        }).then((result) => {
            console.log(result)
            res.send(result);
            return Promise.resolve(result)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}

export function getAccessToken() {
    return new Promise((resolve,reject) => {
        getRedis(config.wechat.token)
            .then((res) => {
                resolve(res)
            }).catch((error) => {
                reject(error)
                throw new Error(error)
            })
    }).then(res => new Promise((resolve,reject) => {
        if(res) {
            resolve(res)
        } else {
            new Wechat().getAccessToken().then((res:any) => {
                saveRedis(config.wechat.token,res.access_token,7100)
                    .then((success) => {
                        resolve(res.access_token)
                    }).catch((error:any) => {
                        reject(error)
                        throw new Error(error)
                    })
            }).catch((error) => {
                reject(error)
                throw new Error(error)
            })
        }
    }))
    .catch(error => {
        throw new Error(error)
    })
}