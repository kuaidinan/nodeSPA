"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cookieParser = require("cookie-parser");
const history = require("connect-history-api-fallback");
const index_1 = require("./routes/index");
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
app.use(cookieParser());
index_1.default(app);
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