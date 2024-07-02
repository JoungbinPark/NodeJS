const express = require('express');
const path = require('path');
const app = express();
app.set('port', process.env.PORT || 3000);  //process.env.PORT 시스템 포트번호

app.get('/', (req, res)=>{
    //http 서버에서는 파일을 읽어서 내용을 전송하지만
    // express서버는 파일을 직접 전송합니다. 
    // http서버는 상대 경로로 파일을 선택하지만
    // express서버는 절대 경로로 파일을 선택합니다. 
    res.sendFile( path.join(__dirname, '/index.html'));
    // __dirname : 현재 파일이 경로
    // __filename : 현재 작성중인 파일의 이름
    // path.join() : 컴마로 구분해서 경로와 경로, 경로와 파일을 조합하는 함수.

});


app.listen(app.get('port'), ()=>{console.log(app.get('port'), "포트 서버 오픈");});