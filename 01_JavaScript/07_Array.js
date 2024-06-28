//07_Array.js
// index(번호)를 사용하여 여러 자료를 한곳에 모아 사용하는 자료구조

// 다양한 자료를 하나의 범주안에 넣고, 인덱싱(번호)을 이용해 컨트롤하는 변수
let array = [273, 'string', true, function(){}, {}, [150, 170]];
console.log(array[0]);
console.log(array[1]);
console.log(array[2]);
console.log(array[3]);
console.log(array[4]);
console.log(array[5]);
console.log(array[5][0]);
console.log(array[5][1]);
console.log(array);
console.log('\n------------------------------\n');

let a = array[5];   //  배열의 요소 중 index 5번의 자료를 변수 a에 저장
let array2 = array; //  참조값의 복사

console.log("#1------------------------------------------------")
// 배열의 내용을 볼 수 있는 방법 #1
console.log(array);

console.log("#2------------------------------------------------")
// 배열의 내용을 볼 수 있는 방법 #2
var arr = ['a', 'b', 'c'];
for( var k in arr ){
    console.log(`key : ${k}, \t arr[${k}] : ${arr[k]}`);
}

// k에는 배열의 index가 차례로 하나씩 저장되면서 반복실행이 실행됩니다.

console.log("#3------------------------------------------------")
// 배열의 내용을 볼 수 있는 방법 #3
// arr.map();   // ()안의 익명함수를 하나 넣을건데 그 익명함수를 배열의 요소들을 대상으로 한번씩 실행
// arr.map(function(){});   // 익명함수가 배열의 요소개수만큼 여러번 실행. 마치 반복실행처럼
arr.map( function(value, idx){
    // value : 배열의 요소들이 한번씩 저장될 변수
    // idx : 그 요소들의 첨자
    console.log( `index:${idx}, value:${value}`);
});

arr.map( (value, idx) => {
    console.log( `index:${idx}, value:${value}`);
});

console.log("#4------------------------------------------------")
// 배열의 내용을 볼 수 있는 방법 #4
for( var i=0; i<arr.length; i++){
    console.log(`index:${i}, value:${arr[i]}`);
}
console.log("#5------------------------------------------------")
// 배열의 내용을 볼 수 있는 방법 #5
for( let v of arr){
    console.log(`value:${v}`);
}

console.log("#6------------------------------------------------")
// of 를 String 자료에 적용한 경우
for( const value of "ABC"){
    console.log(`value : ${value}`);
}

