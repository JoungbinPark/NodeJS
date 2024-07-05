// Regex_02.js

// 메타캐릭터(메타문자) : ^, $, | 등의 글자로 패턴을 표현한 글자들
// | : or 의미로 사용. a|b 는 a 또는 b

let text = "Hello World";
let result = text.match(/Hello|Crow/g);
console.log(result);

text = "Welcome Crow"
result = text.match(/Hello|Crow/g);
console.log(result);

text = "Hello World Welcome Crow";
result = text.match(/Hello|Crow/g);
console.log(result);

console.log('---------------------------------------------------------------');
// ^ : ^abc 는 abc로 시작하는 의미의 정규식([] 안에서 사용할때는 제외하라는 의미)
a = "Life is too short";
result = a.match(/^Life/g);
console.log(result);

// $ : abc$ 는 abc 로 끝나는 의미의 정규식
a = "Life is too short";
result = a.match(/short$/g);
console.log(result);

console.log('---------------------------------------------------------------');
// \b : Word Boundary 의미로 whitespace 식별하는 메타 문자
// 원래 문자열 안에 사용하는 \b 는 백스페이스의 역할을 하는 이스케이프 문자이지만 정규표현식에서는 공백을 의미
console.log();
a = "no class are all classa";
b = a.match(/\bclass\b/g);
console.log(b);
a = 'the declassified algrithm';
b = a.match(/\bclass\b/g);
console.log(b);
a = "one subclass is'";
b = a.match(/\bclass\b/g);
console.log(b);

console.log('---------------------------------------------------------------');
// \B : whitespace(공백)이 아닌 글자들과 매칭, 그 외 다른 글자로 구분되는 정규식
a = "no class are all classa";
b = a.match(/\Bclass\B/g);
console.log(b);
a = 'the declassified algrithm';
b = a.match(/\Bclass\B/g);
console.log(b);
a = "one subclass is'";
b = a.match(/\Bclass\B/g);
console.log(b);

console.log('---------------------------------------------------------------');
// 정방 탐색
// http:/www.naver.com 에서
// 글자들이 연속되고 ':'이 뒤에 붙어있는 정규표현 매칭
// 그런데 결과에서 ':'는 빼고 나머지 글자들만 얻고자 한다면
// 결과적으로 http 만 필요하다면

text = 'http:/www.naver.com';
result = text.match(/.+:/g); // 글자가 연속되고 뒤에 :이 있는 매칭
console.log(result); // 결과 http:

console.log('---------------------------------------------------------------');
// 위와 같은 매칭도 하고 : 도 버리고 http만 취하려면
// 정방탐색을 사용한 예
// 정규식 : (?=정규식 또는 글자)
// 조건에 매칭이 된 후, 해당(?= 뒤로 이어진) 정규식에 있는 글자는 소모하지 않는다(취하지 않는다)

// ':'이 매칭에 사용되지만, 결과에 포함되지는 않음
result = text.match(/.+(?=:)/g); // 후방위 탐색
console.log(result);

console.log('---------------------------------------------------------------');
// 전방위 탐색
// 매칭할 글자를 앞쪽에서 검색하고 취하지 않을때
// ?<= 정규식
text = "★전방위탐색";
result = text.match(/(?<=★).+/g); // 후방위 참색 : ★로 시작되는 매칭 -> ★는 결과에 포함되지 않음
console.log(result);

console.log('---------------------------------------------------------------');
// 후방위탐색
// 매칭할 글자를 뒤쪽에서 검색하고 취하지 않을때
// ?= 정규식

text = '<html><head><title>안녕하세요</title></head><body><div>웹사이트에서 내용을 발췌합니다</div></body></html>';
// <div></div> 가 포함되어 추출
result = text.match(/<div>.+<\/div>/g);
console.log(result);

result = text.match(/(?<=<div>).+(?=<\/div>)/g);
console.log(result);

// 연습문제 1 
// 위의 text 변수의 내용 중 타이틀 내용을 발췌해서 출력
// title 태그는 제외
result = text.match(/(?<=<title>).+(?=<\/title>)/g);
console.log(result);

// 연습문제 2
text = '일반텍스트파일 : abc.txt, 자동실행파일 : autoexes.bat, 데이터분석파일 : bigdata.ai, 더미파일 : gfreag, 알수없는파일 : korea.bar';
// text 변수에서 파일이름.확장자명으로 구성된 파일명과 확장자 출력
// 확장자가 없는 파일 제외
result = text.match(/\w+[.]\w+/g);
console.log(result);
result = text.match(/\w+(?=[.]\w+)/g); // 파일명만, 후방위 탐색
console.log(result);

// 연습문제 3
text = '같은 취미를 가진 사람들과 소통합니다 #취미 #포스팅 취미를 활용하여 포스팅합니다 #소통 #SNS#service ';
// 위 본문에서 해시태그들을 골라내어 출력
result = text.match(/#[^\s#]+/g);
console.log(result);
result = text.match(/(?<=#)[^\s#]+/g);
console.log(result);