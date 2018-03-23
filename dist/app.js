"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require('mongoose');
const history = require("connect-history-api-fallback");
var Redis = require('ioredis');
const index_1 = require("./routes/index");
const index_2 = require("./controller/wechat/index");
const app = express();
const config = require('config-lite')(__dirname);
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("X-Powered-By", '3.2.1');
    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});
mongoose.connect(config.url).then((result) => {
    console.log('mongoose is connect');
}).catch((error) => {
    console.log(error);
});
new Redis(config.redis);
index_1.default(app);
app.use(new index_2.default().createMenu);
app.use(history());
app.use(express.static('../public'));
app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('my server is start,port is %s', config.port);
    }
});
//# sourceMappingURL=app.js.map