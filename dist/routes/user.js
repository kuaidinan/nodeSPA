'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const book_1 = require("../controller/user/book");
const router = express.Router();
router.get('/book', new book_1.default().getList);
exports.default = router;
//# sourceMappingURL=user.js.map