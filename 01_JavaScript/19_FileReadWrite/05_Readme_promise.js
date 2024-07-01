//05_Readme_promise.js

//파일 입출력을 위한 모듈의 promise 포함하여 로딩합니다. 
const fs = require('fs').promises;
//fs의 readfile함수 안에 Promise 객체를 리턴하는 기능이 담겨있는걸 이용하겠다는 뜻

console.log('파일 리딩 시작');
const pm = fs.readFile('./Readme.txt');
pm.then((data)=>{
    console.log(data.toString());
})
.catch((err)=>{
    console.err(err);
})
.finally(()=>{});
console.log('파일 리딩 종료');

// readFile 함수를 동기식으로 전환하여 호출 실행
async function abcd(){
    try{
        console.log("파일 리딩 시작 2");
        const result = await fs.readFile('./Readme.txt');
        console.log(result.toString());
        console.log("파일 리딩 종료 2")
    } catch(err){
        console.error(err);
    }
}

abcd();


/* 
fs.readFile('.\Readme.txt')
.then()
.catch()
.finally();
*/