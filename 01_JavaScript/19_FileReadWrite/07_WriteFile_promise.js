//  07_WriteFile_promise.js

const fs = require('fs').promises;

/* 

fs.writeFile('./writeMe2.txt', '안녕하세요\n반갑습니다')
.then(()=>{
    return fs.readFile('./writeMe2.txt');
})
.then((data)=>{
    console.log(data.toString());
})
.catch((err)=>{console.error(err)})
.finally(()=>{})

*/

async function abcd(){
    try{
        await fs.writeFile('./writeMe3.txt', '안녕하세요\n반갑습니다');
        const result = await fs.readFile('./writeMe3.txt');
        console.log( result.toString() );
    } catch(err){
        console.error(err);
    }
}

abcd();