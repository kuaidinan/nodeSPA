'use strict';

import { Request,Response } from 'express';
import * as HttpRequest from "request";
import { sign,fetch,saveRedis,getRedis } from '../../common/utils';
import { getAccessToken } from '../common/index';
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
    public async createMenu() {
        const token = await getAccessToken()
        return fetch({
            method:'post',
            url:`${config.wechat.prefix}/menu/create?access_token=${token}`,
            json:true,
            body: {
                "button":[{
                     "type":"click",
                     "name":"今日歌曲222",
                     "key":"V1001_TODAY_MUSIC"}]
                }
        }).then((result) => {
            return Promise.resolve(result)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}

/**
 * 创建菜单逻辑
 */
export async function startCreateMenu() {
    const result = await new Wechat().createMenu()
}