const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const mysql = require('mysql2/promise');

async function getConnection(){
    let connection = mysql.createConnection(
        {
            host:'localhost',
            user:'root',
            password:'adminuser',
            database:'nodegram'
        }
    );
    return connection;
}

try{
    fs.readdirSync('uploads');
} catch(error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const uploadObj = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : { fileSize:5*1024*1024},
});

router.post('/imageup', uploadObj.single('image'), (req, res)=>{
    console.log("filename : ", req.file.originalname);
    console.log("savefilename : ", req.file.filename);
    res.json({ image : req.file.originalname, savefilename : req.file.filename });
});

const upObj = multer();
router.post('/writeBoard', upObj.single('image'), async(req, res)=>{
    const { userid, pass, email, title, content, img, savefilename } = req.body;
    const sql = "insert into board( userid, pass, email, title, content, image, savefilename) values(?,?,?,?,?,?,?)";
    const connection = await getConnection();
    console.log(req.body)
    try{
        const [result, field] = await connection.query(sql, [userid, pass, email, title, content, img, savefilename]);
        res.send('ok');
    }catch(err){
        console.log(err)
    }



})


router.get('/boardList', (req, res)=>{
    res.sendFile( path.join(__dirname, '/..', '/views/boardList.html'));
});

router.get('/boards', async (req, res, next)=>{
    const sql = "select * from board order by num desc;"
    try{
        const connection = await getConnection();
        const [rows, fields] = await connection.query(sql);
        // rows 에는 하나의 레코드가 하나의 객체 형태로, 여러 레코드라면 객체를 요소로 하는 배열 형태로 조회됨
        // [{num1, writer:'scott', title:'안녕하세요'...}, {}, {}...]
        res.send( rows );
    }catch(err){
        next(err);
    }
});

router.get('/boardView/:boardnum', async (req, res)=>{
    const sql = 'update board set readcount = readcount + 1 where num=?';
    req.session.boardnum = req.params.boardnum;
    try{
        const connection = await getConnection();
        const [result, fields] = await connection.query( sql, [req.params.boardnum]);
        res.sendFile( path.join(__dirname, '/..', 'views/boardView.html'));
    } catch(err){
        next(err);
    }
});

router.get('/boardViewWithoutCnt', async (req, res)=>{
    res.sendFile( path.join(__dirname, '/..', 'views/boardView.html'));
});


router.get('/getBoard', async(req, res)=>{
    const num = req.session.boardnum;
    const sql = "select * from board where num=?;";
    try{
        const connection = await getConnection();
        const [rows, fields] = await connection.query(sql, [num]);
        res.send(rows[0]);
    }catch(err){
        next(err);
    }
})

router.get('/boardWriteForm', (req, res)=>{
    res.sendFile( path.join(__dirname, '/..', '/views/boardWriteForm.html'));
})

router.get('/updateBoardForm', (req, res)=>{
    res.sendFile( path.join(__dirname, '/..', '/views/boardUpdateForm.html'));
})

router.post('/updateBoard', upObj.single('image'), async(req, res) => {
    const connection = await getConnection();
    const { title, content, img, savefilename} = req.body;
    const num = req.session.boardnum;
    const sql = 'update board set title=?, content=?, image=?, savefilename=? where num=?';
    try{
        const [result, field] = await connection.query(sql, [title, content, img, savefilename, num]);
        res.send('ok');
    }catch{
        console.error(err);
    }
})

router.get("/getReplys", async (req,res,next)=>{
    const boardnum = req.session.boardnum;
    try{
         const connection = await getConnection();
         const sql = 'select * from reply where boardnum = ? order by replynum desc';
         const [rows, fields] = await connection.query(sql, [boardnum]);
         res.send(rows);

    }catch(err){
     console.error(err);
     next(err);
    }
 });

router.post('/insertReply', async (req, res, next) => {
    const { userid, boardnum, content } = req.body;
    try{
        const connection = await getConnection();
        const sql = 'insert into reply(userid, boardnum, content) values(?,?,?)';
        const [result, fields] = await connection.query(sql, [userid, boardnum, content]);
    }catch(err){
        console.error(err);
        next(err);
    }
    res.send('ok');
})

router.delete('/deleteReply/:replynum', async(req, res, next)=>{
    const sql = 'delete from reply where replynum=?'

    try{
        const connection = await getConnection();
        const[result, fields] = await connection.query(sql, [req.params.replynum]);
        res.send('ok');
    }catch(err){
        console.error(err)
        next(err);
    }

})


module.exports = router;