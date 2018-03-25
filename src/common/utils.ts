import { Request,Response } from 'express';
import * as request from 'request';
const sha1 = require('sha1');
const Redis = require('ioredis');
const redis = new Redis();
const config = require('config-lite')(__dirname);

export function sign(req:Request,res:Response) {
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
}

export function fetch(option:any) {
    return new Promise((resolve,reject) => {
        request(
            {
                gzip:true,
                ...option
            },(error:any,res:any,body:any) => {
            if(error) {
                reject(error)
                return
            }
            resolve(body)
        })
    })
}

export function saveRedis(keyName:String,keyValue:any,expireat:Number) {
    return new Promise((resolve,reject) => {
        redis.set(keyName, keyValue, 'EX', expireat,(err:any,result:any) => {
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        });
    })
}

export function getRedis(keyName:String) {
    return new Promise((resolve,reject) => {
        redis.get(keyName, (err:any, result:any) => {
            if(err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}