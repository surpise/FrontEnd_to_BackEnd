
// Module - 함수들의 집합 (라이브러리)
// Module logger.js ---> showLogMessage
// looger.js 모듈을 불러온다.
// express 모듈 -> 웹서버 만들때 쓰는 모듈

const logger = require('./logger.js') // .js는 안 붙여도 됨
logger.showLogMessage('첫번째 로그메시지')
logger.secondLog('두번째 로그메시지')
console.log('Logger 모듈에 들어있는 소중한 값은: ' + logger.pvalue)

// 함수
// function sayHello(name){
//     console.log('Hello ' + name)
// }

// sayHello('John')
// sayHello('Alice')

// const v = 10

// if(v > 5){
//     console.log('It is a big number')
// }
// else{
//     console.log('작은 숫자야!!')
// }

// 3초에 한번씩 주기적으로
// setInterval(()=>{
//     console.log('Node js 연습중입니다...')
// }, 3000)

// setTimeout(()=>{
//     console.log('타임아웃, 한 번만 실행')
// }, 3000)