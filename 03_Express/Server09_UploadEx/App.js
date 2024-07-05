const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('port', process.env.PORT || 3000);

//static 폴더 설정
app.use('/downloads', express.static( path.join(__dirname, 'uploads')));

// 업로드 폴더 생성 및 설정
try{
	fs.readdirSync('uploads');
} catch(err){
	console.error('uploads 폴더가 없어 새로 폴더를 생성합니다.');
	fs.mkdirSync('uploads');
}

// 업로드를 수행할 객체 생성(multer를 활용)
const multerObj = multer(
	{
		storage : multer.diskStorage(
			{
				destination(req, file, done){
					done(null, 'uploads/');
				},
				filename(req, file, done){
					const ext = path.extname(file.originalname);
					const fn = path.basename(file.originalname, ext) + Date.now() + ext;
					done(null, fn);
				},
			}
		),
		limits:{
			filesize : 5 * 1024 * 1024,
		},
	}
)

app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, '/fileupload.html'));
});

app.post('/upload', multerObj.single('image'), (req, res)=>{
	const title = req.body.title;
	const description = req.body.description;
	const price = req.body.price;
	const filename = req.file.filename;

	res.json({title, description, price, filename})
})


app.listen(app.get('port'), ()=>{console.log(app.get('port'), "포트 서버 오픈");});

