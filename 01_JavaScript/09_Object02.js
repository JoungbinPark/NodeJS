// 09_Object02.js

// 객체와 String 자료의 변수  & 함수 이름의 활용
let sayNode = () => {
    console.log("Node");
}
let myName = 'NodeJs';

let myObj = {
    // 이름이 myName이라는 멤버변수를 만들고, 값으로 'NodeJs'라는 String 값을 저장하려고 합니다. 

    //myName:'NodeJs',
    //myName:myName,  //값이 쓰일 위치에 동일한 값을 갖고 있는 변수이름을 사용
    // 멤버변수의 이름과 대입할 값을 갖고 있는 변수이름이 같다면
    myName, 
    // 위와 같이 한번만 써도 myName:myName 이렇게 쓴걸로 인식됩니다.

    /*
    sayNode : () => {
        console.log('Node');
    }
    */
   // sayNode : sayNode,
   sayNode,
};

console.log("멤버변수 myName 값 : ", myObj.myName);
console.log("멤버변수 sayNode 값 : ", myObj.sayNode);
myObj.sayNode();

const obj2 = {myName, sayNode};

console.log("---------------------------------------------------");
//obj3 객체를 만들고 ES6라는 멤버변수를 만들고, 'Fantastic'이라는 값을 저장하려고 한다면
const obj3 = {};
// obj3.ES6 = 'Fantastic';
// obj3['ES6'] = 'Fantastic';
let v = 'ES';
obj3[v+'6'] = 'Fantastic';
console.log("멤버변수 ES6 값 : ", obj3.ES6);

// 위 내용을 모두 종합한 객체 생성
const newObj = {
    myName, 
    sayJS : ()=> { console.log("JS");},
    sayNode,
    [v+6]: 'Fantastic'
};
console.log(newObj.myName);
newObj.sayNode();
newObj.sayJS();
console.log(newObj.ES6);