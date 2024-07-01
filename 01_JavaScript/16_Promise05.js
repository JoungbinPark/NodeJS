//16_Promise05.js
let condition = true;

const job2 = new Promise((resolve, reject)=>{
    if(condition){
        console.log("작업2 시작");
        resolve("작업2 종료");
    } 
    else reject('reject가 호출되었습니다.');
});

async function abcd(){
    try{
        console.log("작업1 시작");
        console.log("작업1 종료");
        let result = await job2();
        console.log(result);
        console.log("작업3 시작");
        console.log("작업3 종료");
    } catch(error){ //promise의 reject에서 보내진 데이터를 error에 저장
        console.error(error);
    }
    
}

abcd();