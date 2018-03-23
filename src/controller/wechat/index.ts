'use strict';

import { Request,Response } from 'express';
import * as HttpRequest from "request";
import { sign,fetch,saveRedis,getRedis } from '../../common/utils';
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
                console.log('123',json)
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
        const token = await updateAccessToken()
        console.log('token',token)
        // var token = await new Wechat().getAccessToken()
        // fetch({
        //     method:'get',
        //     url:`${config.wechat.prefix}/menu/get?access_token=${token}`
        // }).then((result:any) => {
        //     res.send(result.access_token)
        // }).catch((error) => {
        //     throw new Error(error)
        // })
    }
}

export function updateAccessToken() {
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
                resolve(res)
            }).catch((error) => {
                reject(error)
                throw new Error(error)
            })
        }
    })).then((res:any) => new Promise((resolve,reject) => {
        saveRedis(config.wechat.token,res.access_token,100)
        .then((success) => {
            resolve(res.access_token)
        }).catch((error:any) => {
            reject(error)
            throw new Error(error)
        })
    }))
    .catch(error => {
        throw new Error(error)
    })
}