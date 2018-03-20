import * as express from 'express';
// import connectMongo from 'connect-mongo';
// import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as history from 'connect-history-api-fallback';
// import * as Redis from 'ioredis';
// var Redis = require('ioredis')
import router from './routes/index';

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
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});

// const MongoStore = connectMongo(session);
app.use(cookieParser());
// app.use(session({
//     name:config.session.name,
//     secret:config.session.secret,
//     resave:true,
//     saveUninitialized:false,
//     cookie:config.session.cookie,
//     store:new MongoStore({
//         url:config.url
//     })
// }))

// new Redis(config.redis)

router(app);

app.use(history());
app.use(express.static('../public'))

app.listen(config.port,(err:any) => {
    if(err) {
        console.log(err)
    } else {
        console.log('my server is start,port is %s',config.port)
    }
})