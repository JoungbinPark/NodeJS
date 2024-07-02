// 여기가 서버 프로그래밍의 시작 부분

// 서버운영을 위해서 express 모듈을 import해서 express 객체변수에 저장
const express = require('express');
const app = express();  //express 함수를 이용해서 서버운영관련 객체를 변수에 저장
// 익스프레스 서버는 이것만으로도 http 서버의 createServer와 같은 동작이 되었다고 할 수 있다. 

app.set('port', 3000);
//app.set(); : 서버객체의 필드변수를 추가해서 사용할 수 있습니다. 
// 추가되는 변수는 현재 파일에서만 사용이 되고, 서버 종료시 소멸됩니다. 
console.log(app.get('port'));

app.get('/', (req, res)=>{
    res.send('<h1>Hello Express~!!</h1>');
});

//app.get() 같은 함수를 라우터라고 부르겠습니다. 
app.get('/about', (req, res)=>{
    res.send("<h1>Here is About Page~!!</h1>");
});

app.listen(3000, ()=>{ console.log('3000 포트 서버 오픈...');});

// express 서버 구동 순서 -------------------------------
/*
    1. npm init
    2. npm i express
    3. npm i nodemon
    4. app.js 또는 index.js 또는 main에 지정한 파일을 제작
    5. package.json의 scripts에 "start":"nodemon app"을 추가
    6. npm app 또는 npm run start(npm start)로 서버를 시작합니다.
*/

/* nodemon을 사용하면 좋은 점------------------- 
    1. 서버 구동 밀 운용에 발생한 모든 과정을 로깅으로 보여줍니다. 
    2. 에러수정이 용이합니다. 
    3. 일정시간이 지나거나 주요파일이 저장되면 서버가 다시 시작되므로 수정사항이 서버 수동 재시작 없이 적용이 가능합니다. 


*/
