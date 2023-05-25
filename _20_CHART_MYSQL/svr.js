const express = require('express')
const mysql = require('mysql') 
const path = require('path')
const static = require('serve-static')
const dbconfig = require('./config/dbconfig.json')

//database connection pool
const pool = mysql.createPool({
    connectionLimit:10,
    host:dbconfig.host,
    user:dbconfig.user,
    password:dbconfig.password,
    database:dbconfig.database,
    debug:false,
    timezone:'09:00' // Asia/Seoul
})

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/public', static(path.join(__dirname, 'public')))

app.listen(3000, ()=>{
    console.log('Server started at 3000')
})