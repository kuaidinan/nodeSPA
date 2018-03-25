'use strict';

import { Request,Response,NextFunction } from 'express';
import * as HttpRequest from "request";
import { sign,fetch,saveRedis,getRedis } from '../../common/utils';
import { getAccessToken } from '../common/index';
import { resolve } from 'path';
import Auth from '../../common/auth'
const iconv = require('iconv-lite');
const sha1 = require('sha1'); 
const config = require('config-lite')(__dirname);
const auth = new Auth()

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
            body: config.wechatMenu
        }).then((result) => {
            return Promise.resolve(result)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
    public async requestAuth(req:Request,res:Response) {
        // return fetch({
        //     url:`${config.wechat.openPrefix}/connect/oauth2/authorize?appid=${config.wechat.appID}&redirect_uri=${encodeURIComponent(config.domain)}&response_type=code&scope=snsapi_base&state=STATEHello#wechat_redirect`,
        //     // method:'get',
        //     encoding :null,
        // }).then((result:any) => {
        //     console.log(`${config.wechat.openPrefix}/connect/oauth2/authorize?appid=${config.wechat.appID}&redirect_uri=${encodeURIComponent(config.domain)}&response_type=code&scope=snsapi_base&state=STATEHello#wechat_redirect`)
        //     var buf
        //     buf =  iconv.decode(result, 'gb2312');
        //     return Promise.resolve(buf)
        // }).catch((error) => {
        //     return Promise.reject(error)
        // })
        // 返回后的地址http://wechat.xuqiang.site/?code=071SiFZ80OcTZH1JquW80As5090SiFZ8&state=STATEHello
        const redirectUrl = auth.requestUrl(config.domain + '/api/wechat/callBack')
        console.log('redirectUrl',redirectUrl)
        // res.redirect(`${config.wechat.openPrefix}/connect/oauth2/authorize?appid=${config.wechat.appID}&redirect_uri=${encodeURIComponent(config.domain)}&response_type=code&scope=snsapi_userinfo&state=STATEHello#wechat_redirect`)
        res.redirect(redirectUrl)
    }
    public async callBack(req:Request,res:Response,next:NextFunction) {
        res.redirect('/static/')
    }
}

/**
 * 创建菜单逻辑
 */
export async function startCreateMenu() {
    const result = await new Wechat().createMenu()
}