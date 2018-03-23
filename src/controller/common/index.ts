'use strict'
const Redis = require('ioredis');
const redis = new Redis();
const config = require('config-lite')(__dirname);

import { Request,Response,NextFunction } from 'express'
import { saveRedis,getRedis } from '../../common/utils'
import Wechat from '../wechat/index'
import { resolve } from 'path';

export function updateAccessToken() {
    new Promise((resolve,reject) => {
        getRedis(config.wechat.token)
            .then((res) => {
                if(res) {
                    resolve(res)
                } else {
                    new Wechat().getAccessToken().then((res:any) => {
                        saveRedis(config.wechat.token,res.access_token,100)
                            .then((res) => {
                                console.log('res',res)
                                resolve(res)
                            }).catch((error:any) => {
                                reject(error)
                                throw new Error(error)
                            })
                    })
                }
            }).catch((error) => {
                reject(error)
                throw new Error(error)
            })
    })
}