const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
dotenv.config();

app.use(cookieParser());
app.use(session({
    resave:false, saveUninitialized:false, secret: process.env.SESSION_SECRET,
}));
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res)=>{
    // if(req.cookies['session'])
    if(req.cookies.session){
        res.send(`<h2>${req.session[req.cookies.session]}님 반갑습니다.</h2><a href='/logout'>logout</a>`);
    } else{
        res.sendFile(path.join(__dirname, '/index.html'));
    }
});

app.post('/login', (req, res)=>{
    const userid = req.body.userid;
    const pwd = req.body.pwd;
    if(userid=='scott' && pwd == '1234'){  
        //고유키를 하나 발생해서 세션에 저장할 키값으로 사용해서 userid를 저장
        // 그리고 쿠키에 고유키를 session이라는 이름으로 저장

        // 익스프레스 서버에서 세션의 접근은 쿠키와 마찬가지로 req.session으로 접근합니다.
        // 저장형태는 키:밸류 형태의 객체형으로 여러값들을 저장하고 유지시킬 수 있습니다. 
        // 지우거나 서버가 종료될 때까지 또는 제한수명이 다할 때까지 유지 가능

        // 고유키 하나를 생성합니다.
        const uniqueInt = Date.now();   // 현재날짜시간 -> 밀리초
        // 고유키를 저장키값으로 하여 userid를 세션에 저장합니다.
        //req.session.uniqueInt X 
        req.session[uniqueInt] = userid;

        // 고유키는 쿠키에 저장합니다.  저장이름은 'session'
        res.cookie('session', uniqueInt, {httpOnly:true, path:'/'});
        // expires가 없는 쿠키는 브라우저가 닫힐 때까지가 수명입니다. 

        res.json({msg:'ok'});

    }else if(userid !='scott'){
        res.json({msg:'없는 아이디입니다.'})
    }else if(pwd != '1234'){
        res.json({msg:'비밀번호가 맞지 않습니다.'})
    }
})

app.get('/logout', (req, res)=>{
    delete req.session[req.cookies.session];  // 세션의 일부항목 삭제
    // req.session[req.cookies.session]=null;
    // req.session[req.cookies.session]='';
    res.clearCookie('session', req.cookies.session, {httpOnly:true, path:'/'});
    res.redirect('/');

    /* 세션 전체 삭제
    req.session.destroy(
    function(){
        req.session;
    });
    */

})


app.listen(app.get('port'), ()=>{console.log(app.get('port'), "포트 서버 오픈");});
