const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({extended:false}))
dotenv.config();

//쿠키, 세션
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

const indexRouter = require('./Routers');
const userRouter = require('./Routers/user');
const feedRouter = require('./Routers/feed');

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/feed', feedRouter);





// 에러처리 라우터
app.use((req, res, next)=>{
    const err = new Error (`${req.method} - ${req.url} - 라우터가 없습니다`);
    err.status = 404;
    next(err);
})

// 에러처리 미들웨어
app.use((err, req, res, next) => {
    let message = err.message;
    res.status(err.status);
    console.log(message);
    res.send('서버 에러에용');
});


app.listen(app.get('port'), ()=>{console.log("server stared on port number", app.get('port'))});