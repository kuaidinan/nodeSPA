'use strict'
const Redis = require('ioredis');
const redis = new Redis();
const config = require('config-lite')(__dirname);

import { Request,Response,NextFunction } from 'express'
import { saveRedis,getRedis } from '../../common/utils'
import Wechat from '../wechat/index'

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