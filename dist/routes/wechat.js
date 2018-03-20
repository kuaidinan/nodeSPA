'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const router = express.Router();
const index_1 = require("../controller/wechat/index");
const wechat = new index_1.default();
router.get('/getAccessToken', wechat.getAccessToken);
router.get('/sign', wechat.sign);
exports.default = router;
//# sourceMappingURL=wechat.js.map