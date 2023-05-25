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

// building 이름이 주어진 경우를 처리
app.post('/chartdatafromdb_elec', (req, res)=>{
    console.log('chartdatafromdb_elec 호출됨')

    const bid = req.body.bid
    console.log('bid is %s', bid)

    pool.getConnection((err, conn)=>{
        const resData = {}
        resData.result = 'error'
        resData.temp = []
        resData.reg_date = []

        if(err){
            conn.release()
            console.log('Mysql getConnection error.aborted');
            res.json(resData);
        }

        // data에 데이터를 요청한다
        const exec = conn.query(
            'select `value`, `regdate` from `INU_SmartCampus`.`BldngElec where `bldng_name` = ? and `regdate` > "2021-12-20 00:00:00" order by `regdate` asc;',
            [bid],
            (err, rows)=>{
                if(err){
                    console.log('Mysql query error. aborted');
                    res.json(resData);
                    return;
                }

                if(rows[0]){
                    resData.result = 'ok'
                    rows.forEach((val)=>{
                        resData.temp.push(val.value)
                        resData.reg_date.push(val.regdate)
                    })
                }
                else{
                    // query는 성공, 그러나 데이터가 없는 경우
                    resData.result = 'none'
                }

                return res.json(resData);
            }
        )

    })
})

// building id가 주어진 경우를 처리
app.post('/chartdatafromdbwithbid', (req, res)=>{
    console.log('chartdatafromdbwithbid 호출됨')

    const bid = req.body.bid
    console.log('bid is %s', bid)

    pool.getConnection((err, conn)=>{
        const resData = {}
        resData.result = 'error'
        resData.temp = []
        resData.reg_date = []

        if(err){
            conn.release()
            console.log('Mysql getConnection error.aborted');
            res.json(resData);
        }

        // data에 데이터를 요청한다
        const exec = conn.query(
            'select `temperature`, `reg_Date` from `building_temperature` where `building_id` = ? order by `reg_Date` asc;',
            [bid],
            (err, rows)=>{
                if(err){
                    console.log('Mysql query error. aborted');
                    res.json(resData);
                    return;
                }

                if(rows[0]){
                    resData.result = 'ok'
                    rows.forEach((val)=>{
                        resData.temp.push(val.temperature)
                        resData.reg_date.push(val.reg_Date)
                    })
                }
                else{
                    // query는 성공, 그러나 데이터가 없는 경우
                    resData.result = 'none'
                }

                return res.json(resData);
            }
        )

    })
})

app.post('/chartdatafromdb', (req, res)=>{
    console.log('chartdatafromdb 호출됨')

    pool.getConnection((err, conn)=>{
        const resData = {}
        resData.result = 'error'
        resData.temp = []
        resData.reg_date = []

        if(err){
            conn.release()
            console.log('Mysql getConnection error.aborted');
            res.json(resData);
        }

        // data에 데이터를 요청한다
        const exec = conn.query(
            'select `temperature`, `reg_Date` from `building_temperature` order by `reg_Date` asc;',
            (err, rows)=>{
                if(err){
                    console.log('Mysql query error. aborted');
                    res.json(resData);
                    return;
                }

                if(rows[0]){
                    resData.result = 'ok'
                    rows.forEach((val)=>{
                        resData.temp.push(val.temperature)
                        resData.reg_date.push(val.reg_Date)
                    })
                }
                else{
                    // query는 성공, 그러나 데이터가 없는 경우
                    resData.result = 'none'
                }

                return res.json(resData);
            }
        )

    })
})

app.listen(3000, ()=>{
    console.log('Server started at 3000')
})