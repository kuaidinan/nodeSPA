"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require('mongoose');
const history = require("connect-history-api-fallback");
const path = require("path");
var Redis = require('ioredis');
const index_1 = require("./routes/index");
const app = express();
const config = require('config-lite')(__dirname);
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", 'text/html; charset=utf-8');
    res.header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36');
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
app.use('/static', express.static(path.join(__dirname, '..', 'public')));
app.use(history());
app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('my server is start,port is %s', config.port);
    }
});
//# sourceMappingURL=app.js.map