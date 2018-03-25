'use strict';
import participant from './participant'
import wechat from './wechat'
import auth from '../controller/wechat/auth'
import { Express } from 'express';

export default (app:Express) => {
    app.use('/auth',auth)
    app.use('/api/participant',participant)
    app.use('/api/wechat',wechat)
}