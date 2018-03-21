'use strict';

var express = require('express')
const router = express.Router();

import Wechat from '../controller/wechat/index';
const wechat = new Wechat();

router.get('/getAccessToken', wechat.getAccessToken);
router.get('/sign', wechat.sign);
router.get('/getMenu', wechat.getMenu);

export default router;