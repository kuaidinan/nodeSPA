'use strict';

import wechat from './wechat'
import participant from './participant'
import { Express } from 'express';

export default (app:Express) => {
    app.use('/api/participant',participant)
    app.use('/api/wechat',wechat)
}