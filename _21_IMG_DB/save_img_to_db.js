const mysql = require('mysql')
const fs = require('fs')
const dbconfig = require('./config/dbconfig.json')

const connection = mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    debug: false
})

// 로컬에서 이미지를 읽어서, DB에 저장
const dog = {
    img: fs.readFileSync('./dog.jpg'),
    name: 'Dog'
}

const cat = {
    img: fs.readFileSync('./cat.jpg'),
    name: 'Cat'
}

const query1 = connection.query(
    'INSERT INTO `Animals` SET ?',
    dog, ()=>{
        (err, result)=>{
            if(err){
                console.dir(err)
                return
            }
            console.log('이미지를 db 추가 성공: ')
            console.log(query1.sql)
            console.dir(result)
        }
    }
)

const query2 = connection.query(
    'INSERT INTO `Animals` SET ?',
    cat, ()=>{
        (err, result)=>{
            if(err){
                console.dir(err)
                return
            }
            console.log('이미지를 db 추가 성공: ')
            console.log(query2.sql)
            console.dir(result)
        }
    }
)

connection.end()