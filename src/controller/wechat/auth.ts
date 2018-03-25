import { Request,Response,NextFunction } from 'express';
import { fetch } from '../../common/utils';
import Wechat from './index'
export default async function auth(req:Request,res:Response,next:NextFunction) {
    new Wechat().requestAuth(req,res)
}