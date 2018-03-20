'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const router = express.Router();
const index_1 = require("../controller/participant/index");
const participant = new index_1.default();
router.get('/getList', participant.getList);
exports.default = router;
//# sourceMappingURL=participant.js.map