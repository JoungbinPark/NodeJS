//09_Object.js

// 하나의 변수 안에 여러 속성(멤버변수) & 멤버 메서드들을 생성해놓고 객체지향프로그래밍을 할 수 있습니다. 
// {} 중괄호 안에 key(요소의 이름)과 value(요소의 값)이 ':'(콜론)으로 구분되어서 존재하는 값들의 집합
var objectVar = {a:10, b:20};
var product = { name:'냉장고', 제조사:'대한민국'};
var obj = {};

// 배열의 자료형
console.log("objectVar : ", typeof( objectVar) );
console.log("product : ", typeof( product ) );
console.log("obj : ", typeof( obj ) );

console.log("{a:10, b:20} : ", typeof({a:10, b:20} ) );
console.log("{ name:'냉장고', 제조사:'대한민국'} :", typeof({ name:'냉장고', 제조사:'대한민국'}));
console.log("{} : ", typeof( {} ) );

// 객체의 값
console.log("objectVar.a : ", objectVar.a, " objectVar.b : ", objectVar.b);
console.log("product.name : ", product.name, "product.b : ", product.제조사);
console.log("objectVar.a : ", objectVar['a'], " objectVar.b : ", objectVar['b']);
console.log("product.name : ", product['name'], "product.b : ", product['제조사']);
console.log("----------------------------------------------------");

// 자바스크립트의 객체는 별도의 클래스 선언 없이, {} 중괄호 안에 직접 속성(키:값)들을 넣는 순간 객체(Object)로 인식되어 사용되어집니다. 값들의 자료형은 제한이 없으며, "객체안의 객체", "객체안의 배열" 등 모든 형태의 자료가 속성들로 구성이 가능합니다. 
var obj1 = {
    useNumber:273,
    useString:'문자열', 
    useBoolean:true,
    useObject:{a:'1', b:'2'},
    useArray:[1, 2, 3, 4, 5],
}

for( var k in obj1){
    console.log(`${k} : ${obj1[k]}`);
}

console.log("-------------------------------------------")
// 객체의 속성 추가와 제거
// -동적 속성 추가제거 : 처음 객체 생성하는 시점 이후에 객체의 속성을 추가하거나 제거할 수 있습니다. 
// 빈 객체를 생성
var student = {};
// 속성(멤버변수) 추가
student.이름='홍길동';
student.취미='악기';
student.특기='프로그래밍';
student['장래희망'] = '훌륭한 백엔드 개발자';
for(var key in student){
    console.log(`${key}: ${student[key]}`);
}

console.log("-------------------------------------------")
// 객체의 속성 제거
delete(student.장래희망);
for(var key in student){
    console.log(`${key}:${student[key]}`);
}

console.log("\n------------------------------------------");
// 객체의 멤버메서드
// 객체 내부에 있는 멤버변수(속성)를 컨트롤하거나 객체관련 명령을 실행하기 위한 함수
var object={
    useNumber:273,
    useString:'문자열',
    useBoolean:true,
    useArray:[52, 385, 103, 58],
    method: function(){
        console.log('맴버 함수(익명함수)를 실행합니다.');
    },
    func : () => {
        console.log('멤버 함수(화살표 함수)를 실행합니다.');
    }
}
object.method();
object.func();

console.log("---------------------------------------------");
var person = {
    name:'홍길동',
    eat:function(food){
        console.log(`${this.name}이/가 ${food}을/를 먹었습니다.`);
    }
};
person.eat('김밥');

console.log("----------------------------------------------");
// 생성자 함수
// new 키워드를 사용해 똑같은 객체를 여러개 생성할 수 있는 함수.

// 생성자 함수 제작 방법:
// 1. 함수 하나를 생성하되 함수안에 this를 이용한 변수에 값을 넣습니다. 
// 2. 그러면 그 이름의 멤버 변수가 만들어지고, 
// 3. 최종 그 변수들을 멤버로 하는 객체가 만들어지는 생성자 함수로 인식됩니다. 
function Student(name, korean, math, english, science){
    this.name = name;
    this.korean = korean;
    this.math = math;
    this.english = english;
    this.science = science;
}

var std1 = new Student("홍길동",88,78,98,87);
var std2 = new Student("홍길남",77,65,89,65);
var std3 = new Student("홍길서",99,74,95,78);

console.log(std1);
console.log(std2);
console.log(std3);

Student.music=100;
var std4 = new Student('홍길북',100,100,100,100);
console.log(std4);

std1.music = 100;

//7. 프로토타입
// 생성자 함수를 사용해 생성된 객체가 공통으로 가지는 공간.
// 자바스크립트의 모든 생성자 함수는 내부의 this 변수들의 prototype을 갖습니다. 
// 생성자함수에 멤버 변수나 멤버 메서드를 추가해서 생성자를 이용하여 객체가 만들어질 때 적용되게 하려면 프로토타입을 이용합니다. 

// 생성자함수에 추가로 멤버변수 또는 멤버메서드를 추가
Student.prototype.music = 100;
var std7 = new Student("홍길남북", 87,98,87,45);
console.log(std7);
console.log(`std7.music : ${std7.music}`);
