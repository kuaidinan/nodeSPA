'use strict';

import { Request,Response,NextFunction } from 'express'

export default class Participant {
    async getList(req:Request,res:Response) {
        try{
            res.send({
                text:'123'
            })
        }catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }
}