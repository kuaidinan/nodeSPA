import * as express from 'express';
const mongoose = require('mongoose');
import * as cookieParser from 'cookie-parser';
import * as history from 'connect-history-api-fallback';
import * as path from 'path';
// import * as Redis from 'ioredis';
var Redis = require('ioredis')
import router from './routes/index';
import Wechat,{ startCreateMenu } from './controller/wechat/index'

const app = express();
const config = require('config-lite')(__dirname);

app.all('*', (req, res, next) => {
	// const origin = req.headers.origin;
	// res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", 'true'); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	res.header("Content-Type", 'text/html; charset=utf-8')
	res.header('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36');
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});

mongoose.connect(config.url).then((result:any) => {
	console.log('mongoose is connect')
}).catch((error:any) => {
	console.log(error)
})

new Redis(config.redis)

router(app);
// 自定义微信订单
// startCreateMenu()

app.use('/static',express.static(path.join(__dirname,'..','public')))
app.use(history());
app.listen(config.port,(err:any) => {
    if(err) {
        console.log(err)
    } else {
        console.log('my server is start,port is %s',config.port)
    }
})