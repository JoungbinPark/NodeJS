const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require('bcrypt');
const mysql = require("mysql2/promise");

async function getConnection(){ //동기식
    let connection = await mysql.createConnection(
        {
            host:"localhost",
            user:"root",
            password:"adminuser",
            database:"nodegram"
        }
    );
    return connection;
}

router.post("/login", async(req, res, next)=>{
    const {email, pwd} = req.body;

    const sql = "select* from user where email=?";

    try{
        const connection = await getConnection();
        const [rows, fields] = await connection.query(sql, [email]);

    if(rows.length >= 1){ // == rows[0]
        const result = await bcrypt.compare(pwd, rows[0].pwd);
        if(result){
            const uniqueInt = Date.now(); // 밀리초로 만듬
            req.session[uniqueInt] = rows[0]; // 세션에다가 키값으로 밀리초로 얻어온 코드를 넣고 값으로 DB에서 얻어온 레코드를 
            // 넣는다.
            res.cookie("session", uniqueInt, {httpOnly:true, path:"/"}); // 그리고 그것을 쿠키에다가 저장할 때 session 이라는 키로 값은 세션에다가 저장한 키를 넣어둔다.
            res.json({msg:"ok"});
        }else{
            res.json({msg:"비밀번호가 맞지 않습니다."}); 
        }
    }else{
        res.json({msg:"아이디가 없습니다."});
    }
    }catch(err){
        next(err);
    }
});

router.get("/joinForm", (req, res, next)=>{
    res.sendFile( path.join(__dirname, '/..', '/views/joinform.html'));
})

router.post('/join', async(req, res, next)=>{
    const {email, pwd, nick} = req.body;
    console.log(req.body);
    try{
        const connection = await getConnection();
        let sql = 'select * from user where email =?';
        const [rows1, field1] = await connection.query(sql, [email]);
        sql = 'select * from user where nickname=?';
        const [rows2, field2] = await connection.query(sql, [nick]);
        if(rows1.length>=1){
            res.json({msg : '이메일이 중복됩니다.'});
        } else if(rows2.length>=1){
            res.jsoon({msg:'닉네임이 중복됩니다.'});
        } else{
        sql = 'insert into user(email, nickname, pwd) values(?,?,?)';
        const hash = await bcrypt.hash(pwd, 12);    //pwd 암호화
        const result = await connection.query(sql, [email, nick, hash]);
        res.json({msg:'ok'})
        }


        
    }catch(err){
        next(err);
    }
})

router.get('/getLoginUser', (req, res)=>{
    const loginUser = req.session[req.cookies.session];
    res.send(loginUser);

})


module.exports = router;