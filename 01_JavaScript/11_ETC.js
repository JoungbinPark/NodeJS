// 11_ETC.js

// 배열의 복사
let arr1 = [1,2,3,4];
// 배열의 복사 [... 복사하려는 배열의 이름]
let arr2 = arr1;
console.log("참조값의 복사 : 변경 전 ------------------------------");
console.log(arr1);
console.log(arr2);
arr1[0] = 100;
console.log("참조값의 복사 : 변경 후 ------------------------------");
console.log(arr1);
console.log(arr2);

// 배열 요소의 복사
let arr3 = [...arr1];
console.log("배열 요소의 복사 : 변경 전 ---------------------------");
console.log(arr1);
console.log(arr3);
arr1[1] = 200;
console.log("배열 요소의 복사 : 변경 후 ---------------------------");
console.log(arr1);
console.log(arr3);
console.log("배열 요소의 복사 : 복사와 동시에 요소 추가 -------------");
arr4 = [...arr1, 5]; // 복사와 동시에 요소 추가
console.log(arr4);
console.log("두 배열의 병합 ---------------------------------------");
arr5 = [...arr1, ...arr3]; // 복사와 동시에 요소 추가
console.log(arr5);

console.log("\n--------------------------------------------------------");

// 배열과 객체의 구조 분해

/*
// 배열의 구조분해
let arr6 = [];
arr6.push("abcd");
arr6.push(100);
arr6.push({'a':200});

let arr7 = [0,1,2,3];
let one, two, three, four, five;
// zero = arr7[0];
// one = arr7[1];
// two = arr7[2];
// three = arr7[3];
// [zero, one, two, three] = arr7;
// console.log(zero, one, two, three);

// 변수의 갯수를 조절해서 분해할당 하고싶지 않은 값을 조절할 수 있습니다
// [zero, one, two] =  arr7;

// 다수의 요소를 갖고 있는 배열에서 중간에 일부를 제외한 요소를 취할때
// [zero, , , three] = arr7;


// 배열의 요소 갯수보다 할당받을 변수의 갯수가 많다면 남는 변수값은 undefined가 됩니다
[zero, one, two, three, four, five] = arr7;
// console.log(zero, one, two, three, four, five);

// 2차원, 3차원의 복잡한 배열의 구조 분해
let arr8 = [0, 1, 2, [300, 400]];
// 형태를 맞춰서 구조분해 연산을 실행
[zero, one, two, [three, four]] = arr8;
console.log(zero, one, two, three, four);
*/

// 객체의 구조분해
let obj = {one:1, nine:9};
// 객체의 구조분해는 구조분해와 동시에 키값과 같은 이름의 변수를 생성하며 실행하는 것이 보통
let {one, nine} = obj;
console.log(one, nine);

// 필드명을 이용하여 객체의 구조분해를 할 수 있으며, 이름이 맞지 않는 필드는 분해해서 제외시킬 수 있습니다. 또한 필드로 존재하지 않는 변수는 undefined로 저장됩니다.

let {a1, a2} = obj;
console.log(a1, a2);

// 객체의 구조분해는 구조분해와 동시에 변수를 생성하며 실행하는 것이 보통입니다.

let three, four;
let obj1 = {three:3, four:4};
// {three, four} = obj1;  //에러 : 이미 생성된 변수로 구조분해하는 경우
({three, four} = obj1);         // 객체를 변수에 저장하는 연산으로 '='이 쓰이는 것이 아니라 구조분해하는 것으로 인식하게 하기 위해 ( )를 사용합니다.
console.log(three, four);

console.log("----------------------------------------------");
function func4( {one, two, three}){
    console.log(one, two, three);
}

let obj2 = {one:1, two:2, three:3};
func4(obj2);

func4({one:4, two:5, three:6});

console.log("----------------------------------------------");
function func5( a ){
    console.log(a.one, a.plus.two, a.plus.five);
}

let obj3 = {one:5, plus:{two:2, five:5}};
func5( obj3);

console.log("----------------------------------------------");
// 구조분해 및 매개변수의 기본값(default value)

// 배열 구조분해 기본값
let [ar1, ar2, ar3 = 5] = [1,2];    //구조분해되는 변수에 기본값이 넣어서 전달값이 없어도 적용되게 합니다.
// let [ar1, ar2, ar3 = 5] = [1,2,300]; // 이 경우 기본값 3은 지워지고 입력값 300이 ar3 변수에 대입됩니다.
console.log(ar1, ar2, ar3);
// 객체 구조분해 기본값
let {ob1, ob2 = 7} = {ob1:6};
// let{ob1, ob2 = 7} = {ob1:6, ob2:700};    // 이 경우 기본값 7은 지워지고 입력값 700이 ob2 변수에 대입
console.log(ob1, ob2);

console.log("----------------------------------------------");
let funcEx = (a=100) =>{return a*20};

let result = funcEx();
console.log(`result : ${result}`);

// 매개변수가 배열일 때의 기본값
let getTotal = ([one, two] = [10, 20]) => (one + two);
result = getTotal();
console.log(`return Value : ${result}`);
console.log(`return Value : ${getTotal()}`);
console.log(`return Value : ${getTotal([30, 40])}`)

// 매개변수가 객체일 때의 기본값
let getValue = ({two:value} = {two:200}) =>(value*20);

console.log(`return Value : ${getValue( { two:300 } )}`)
console.log(`return Value : ${getValue( )}`)

console.log("----------------------------------------------");
// 디스트럭처링 : 객체의 필드명을 문자열의 연산으로 조합하여 생성
let item = {
    ["one" + "two"]:12
};

console.log(`item 객체의 멤버변수 onetwo의 값 ${item.onetwo}`);

// item 변수에 앞서서 저장한 객체를 지우고 "tennis"라는 String 데이터를 저장합니다.
item = "tennis";

let sports = {
    [item] : 1,
    [item + "Game"] : "윔블던",
    [item + "Method"](){
        return this[item];
    }
}
console.log(`sports 객체의 멤버변수 값들 - tennis:${sports.tennis}, tennisGame:${sports.tennisGame}, tennisMethod:${sports.tennisMethod()}`);

console.log("\n----------------------------------------------");
// 내장된 객체 : Number 객체
// 표현가능한 양의 정수 max 값
console.log("1. 표현가능한 양의 정수 max 값 : ", Number.MAX_SAFE_INTEGER);
console.log("2. Math.pow(2, 53) -1 : ", -(Math.pow(2, 53) -1));

console.log("\n----------------------------------------------");
// Number 객체에서 사용할 함수(메서드)
// 대상데이터가 정수인지 아닌지를 판별
// "Number.isInteger() 함수의 사용"

let v = 0;
console.log("1. 0 : ", Number.isInteger( v ));
console.log("2. 1.0 : ", Number.isInteger( 1.0 ));
console.log("3. -123 : ", Number.isInteger( -123 ));
console.log("4. '12' : ", Number.isInteger( "12" ));
console.log("5. 1.02 : ", Number.isInteger( 1.02 ));
console.log("6. NaN : ", Number.isInteger( NaN ));
console.log("7. true : ", Number.isInteger( true ));
// 변수에 저장된 자료의 자료형을 알 수 있는 함수 typeof가 있지만 이는 자료형을 리턴해줄 뿐, 필요에 의해 숫자인지 아닌지를 구분까지 하지는 못해서, 숫자가 반드시 필요한 경우의 구분을 Number.isInteger로 구분합니다.

console.log("\n----------------------------------------------");
// String 데이터와 Number 데이터와의 관계
// 자바에서 'A' -> integer 형변환하면 (int)'A' => 65, (int)'B' => 66, (char)67 => 'C'

console.log("1:", String.fromCodePoint(35, 36, 37, 38));
console.log("2:", String.fromCodePoint(65, 66, 67, 68));
console.log("3:", String.fromCodePoint(97, 98, 99, 100));
console.log("4:", String.fromCodePoint(48, 49, 50, 51));
console.log("5:", String.fromCodePoint(0x31, 0x32, 0x33, 0x34));
console.log("6:", String.fromCodePoint(44032, 44033, 44034, 44035));

console.log("\n----------------------------------------------");
// startsWish : 대상문자들이 지정한 글자로 시작하면 true, 그렇지 않으면 false
let target = "123가나다";
console.log("1:", target.startsWith(123));
console.log("2:", target.startsWith("23"));
console.log("3:", target.startsWith("가나", 3));  //인덱스 3부터 "가나"로 시작
console.log();
target = "123가나다라456";
console.log("1: ", target.includes(2));
console.log("2: ", target.includes("가나"));
console.log("3: ", target.includes("12", 5));
