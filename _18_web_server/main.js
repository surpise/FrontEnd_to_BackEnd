// npm init -y
// npm install express --save
const express = require('express') 
const app = express()

// pages 경로로 들어오는 요청에 대해서는
// 로컬 폴더 __dirname : main.js가 있는 폴더 위치
// __dirname + '/pages'
app.use('/scripts', express.static(__dirname+'/scripts'))

app.listen(3000, ()=>{
    console.log('3000번에 귀를 대고 듣기 시작했음.')
})

// 처리해주는 루틴들을 추가....
app.get('/', (req, res)=>{
    console.log('===> 루트에 대한 요청들어왔음')
    //res.send('루트에 대한 요청')
    res.sendFile(__dirname+'/pages/index.html')
})

app.get('/about', (req, res)=>{
    console.log('===> about에 대한 요청들어왔음')
    //res.send('about에 대한 요청')
    res.sendFile(__dirname+'/pages/about.html')
})

app.get('/working', (req, res)=>{
    console.log('===> working에 대한 요청들어왔음')
    //res.send('working에 대한 요청')
    res.sendFile(__dirname+'/pages/working.html')
})

