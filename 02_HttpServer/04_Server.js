// 04_Server.js

const http = require('http');
const fs = require('fs').promises;

const users = {};

http.createServer(
    async (req, res) =>{
        try{
            if(req.method == 'GET'){
                if(req.url === '/'){    // http://localhost:3000
                    const data = await fs.readFile('./04_index.html');
                    // writeHead : 클라이언트에 표시된 내용의 페이지 헤더 전송
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    // 본문 내용은 res.write 또는 res.end로 전송하는데 res.end는 전송 종료의 의미도 있다. 
                    return res.end(data);
                } else if( req.url === '/about'){
                    const data = await fs.readFile('./04_about.html');
                    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                    return res.end(data);
                } else if( req.url === '/user'){
                    res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
                    // users 객체 안의 내용을 json 형식으로 변경하여 전송
                    return res.end(JSON.stringify(users));
                }

            } else if(req.method == 'POST'){
                if(req.url === '/user'){
                    req.on('data', (data)=>{
                        //console.log(data);
                        let body = data.toString();
                        //console.log(body);
                        const { username } = JSON.parse(body);
                        //console.log(username);
                        const id =Date.now();   //현재시간날짜를 밀리초로
                        users[ id ] = username;
                        console.log(users);
                        return res.end('ok');
                    });
                }

            } else if(req.method == 'PUT'){
                if(req.url === '/user'){
                    req.on('data',(data)=>{
                        let body = data.toString();
                        const{key, username} = JSON.parse(body);
                        users[key] = username;
                    });
                    return res.end('ok');
                }

            } else if(req.method == 'DELETE'){
                if(req.url.startsWith('/user')){
                    // url = '/user/41560148569'
                    // [0], user : [1], 41560148569 : [2]

                    let urlarr = req.url.split('/');    //대상 String 데이터를 지정한 글자로 분리하여 배열에 저장
                    //ex) '123-456-789-000'.split('-') => [123, 456, 789, 000]
                    const key = urlarr[2];
                    delete users[key];
                    return res.end('ok');
                }

            }
        } catch(err){
            console.error(err);
        }

    }
).listen(3000, ()=>{console.log('3000포트에서 서버 오픈')});