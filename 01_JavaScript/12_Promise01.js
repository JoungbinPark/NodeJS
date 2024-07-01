//12_Promise01.js

//함수와 비슷한 기능을 가지고 있는 '객체'
// 객체 내에 익명함수 하나를 품고 있고,
// 익명함수를 실행하고 결과를 보관하고 있다가,
// 결과가 필요할 때 함수실행결과를 전달받아 사용할 수 있게 해주는 구조의 객체
// 비동기식 실행이다.

//promise 객체의 전달인수 없는 선언문
//const pm = new Promis( /*익명함수 */);
// promist 객체는 생성자의 전달인수로 현재 promise객체의 기능을 갖는 익명함수를 전달하여야 생성됩니다.

const pm = new Promise( (resolve, reject) => { } );

let func = (resolve, reject) => {};
const pm1 = new Promise(func);

// 매개변수 resolve와 reject에는 함수가 전달되서 resolve(), reject() 형식으로 함수가 호출되는 명령이 작성됩니다.

const pm2 = new Promise((resolve, reject) => {
    resolve();
    //또는 reject();
});
// resolve와 reject 변수에 전달되는 함수는 promise 객체가 자체적으로 전달해줍니다.
// ---------------------------------------------------------

// 익명함수 안에서 promise에 부여된 임무를 위한 코드들이 실행되면서 같이 resolve(), reject()가 선택실행됩니다.
const pm3 = new Promise((resolve, reject) =>{
    // 명령1, 명령2 ....
    if(/*조건 */ true /* or false */){
        resolve('성공');
    } else{
        reject('실패');
    }
});

//위에 넣은 전달인수는 반드시 String 데이터여야 하는것은 아닙니다. 어떤 유형의 데이터도 전달될 수 있습니다.
// 주로 promise 결과를 사용할 곳에서 유용하게 사용할 데이터를 전달합니다.
// String, Number, 배열, 객체 모두 전달이 가능합니다.

//promise 객체의 실행결과 활용(결과를 품고 있는 객체를 필요에 의해 필요한 때에 별도 활용할 수 있습니다.)
pm3.then();
pm3.catch();
pm3.then().catch();
pm3
.then( () => {})
.catch(() => {});
// resolve()가 호출된 경우 then 안의 익명함수가 실행되고,
// reject()가 호출되거나 pm에 오류가 있는 경우 catch 안의 익명함수가 실행됩니다.

pm3
.then((message) =>{
    console.log(message);
})
.catch((message)=>{
    console.log(message);
});
//resolve와 reject에 전달된 값들은 위의 message 매개변수에 저장됩니다.

console.log("---------------------------------------------")
let condition = true;

const pm5 = new Promise((resolve, reject)=>{
    if(condition){
        resolve("condition 값은 true입니다.");
    }else{
        reject("condition 값은 false입니다.");
    }
});
// console.log("다른명령 or 딴짓");
// console.log("다른명령 or 딴짓");
// console.log("다른명령 or 딴짓");
// console.log("다른명령 or 딴짓");
// console.log("다른명령 or 딴짓");

pm5
.then((msg)=>{
    console.log(msg);
})
.catch((msg)=>{
    console.log(msg);
})
.finally(() =>{
    console.log("Promise 종료");
});

console.log("다른명령 or 딴짓");
console.log("다른명령 or 딴짓");
console.log("다른명령 or 딴짓");
console.log("다른명령 or 딴짓");
console.log("다른명령 or 딴짓");
console.log("프로그램 종료");