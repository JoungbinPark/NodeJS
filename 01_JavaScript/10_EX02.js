// 배열 자료를 반복실행을 이용하여 학생단위의 객체로 저장하고 다시 객체배열로 구성하여 for문을 이용하여 학생별로 출력하세요.

const names= ['홍길동', '홍길남', '홍길서', '홍길북'];
const kors=[98,78,56,89];
const mats=[89,57,48,69];
const engs=[88,99,49,78];


const students=[];

function student(name, kor, mat, eng){
    this.name = name;
    this.kor = kor;
    this.mat = mat;
    this.eng = eng;
}

for(var i=0; i<names.length; i++){
    students.push(new student(names[i], kors[i], mats[i], engs[i]))    
}
console.log(students);