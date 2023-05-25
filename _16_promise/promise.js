'use strict'

// javascript (type 없음) ----> typescript (type 있음)

// 동기식 ==> 코드가 위에서 아래로 수행되고, 결과도 그 순서대로 출력
// let request = new XMLHttpRequest()
// request.open('GET', 'http://127.0.0.1:5500/_1_hello_world/hello.html', false)
// // 127.0.0.1 -> local loop (자기자신)
// request.send(null)

// if(request.status === 200){
//     console.log(request.responseText)
// }

// for(let i = 0; i < 10; i++){
//     console.log(i);
// }

// javascript ---> promise

// const a = new Promise((resolve, reject)=>{
//     //---------------------해아 할 일을 지정
//     // 해야할 일이 끝나면 resolve 호출, 실패하면 reject 호출
//     console.log('hello')
//     //resolve('ended')
//     setTimeout(()=>{
//         resolve('ended')
//     }, 3000);
// })

// a
//.then((v)=>{
//     console.log(`then received: ${v}`)
// })

// for(let i = 0; i < 10; i++){
//     console.log(i)
// }

// 비동기식 요청
// 코드가 씌여진 순서와는 상관없이 진행
// let request = new XMLHttpRequest() // 실행 순서 1
// // 서버로부터 응답이 왔을 때, 실행될 코드를 지정, 핸들러 ,이벤트 핸들러를 지정해서
// // 응답을 처리

// // request.onload : 요청에 대한 응답이 로딩될 때...
// request.onload = ()=>{ // 순서 4 <- 응답 오기 전이므로 나중에 실행
//     if(request.status === 200){
//         console.log('응답이 제대로 왔음')
//         console.log(request.responseText)
//     }
//     else{
//         console.log('응답이 제대로 오지 않았음')
//     }
// }

// request.open('GET', 'http://127.0.0.1:5500/_1_hello_world/hello.html', true) // 순서 2
// // param false = request가 동기식이다, true = request가 비동기식이다
// request.send(null)

// for (let i = 0; i < 10; i++){ // 순서 3 <- 응답 안와도 먼저 실행
//     console.log(i)
// }

// promise를 이용한 비동기 서버 요청
// XMLHttpRequest : event handler ---> 비동기 처리
// Promise : fetch

// // fetch : 가져오다, 서버로부터 web page를 가져오다
// fetch('http://127.0.0.1:5500/_1_hello_world/hello.html') // 반환값이 promise
// .then((response)=>{    // fetch가 성공하여 서버로부터 응답이 제대로 왔을 때 실행
//     console.log(`서버 응답 도착`)
//     return response.text() // 반환값이 문자열이 아님. 또다른 promise를 반환
// })
// .then((data)=>{
//     console.log(`문자열로 바꾼 응답: ${data}`)
// })
// .catch((err)=>{
//     console.log(`서버응답 에러: ${err}`)
// })

// // for문을 넣는 이유: 비동기 요청과 상관없는 부분이 별도로 실행되는지 확인하기 위해서
// for(let i = 0; i < 10; i++){
//     console.log(i)
// }

// async : syntatic sugar for promise
/* c언어 코드
int k = 0
if(k > 1){
    k = 3;
}
else{
    k = 0;
}
*/
// syntatic sugar
// k = (k > 1) ? 3 : 0;

// promise
// function fetchUser(){
//     return new Promise((resolve, reject)=>{
//         console.log(`Promise 실행`)
//         resolve('실행끝')
//     })
// }

// const a = fetchUser()
// a
// .then((v)=>{
//     console.log(`fetchUser result: ${v}`)
// })

// syntatic sugar

function B(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('B가 실행됨')
            resolve(45)
        }, 3000);
    })
}

async function fetchUser(a){
    console.log(`Promise 실행`) // 원래 실행해야 하는 부분

    const k = await B() // await는 async 함수 내에서만, 다른 promise의 종료를 기다릴 때 사용 가능

    if(k >= 0){
        return '실행끝' // resolve에 해당
    }
    else{ // a < 0
        throw new Error('음수') // reject에 해당
    }
}

// 아래는 변하지 않음
const a = fetchUser(-5)
a
.then((v)=>{
    console.log(`fetchUser result: ${v}`)
})
.catch((error)=>{
    console.log(`에러발생: ${error}`)
})
.finally(()=>{
    // resolve 혹은 reject에 상관없이
    // promise가 종료되면서 공통적으로 실행되야 되는 부분
    console.log(`Promise 끝 from finally`)
})