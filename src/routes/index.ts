'use strict';
import participant from './participant'
import wechat from './wechat'
import { Express } from 'express';

export default (app:Express) => {
    app.use('/api/participant',participant)
    app.use('/api/wechat',wechat)
}