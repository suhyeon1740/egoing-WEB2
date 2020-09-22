// 📖 쿠키란 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각입니다.
// 브라우저는 그 데이터 조각들을 저장해 놓았다가, 동일한 서버에 재 요청 시 저장된 데이터를 함께 전송합니다.
// 쿠키는 두 요청이 동일한 브라우저에서 들어왔는지 아닌지를 판단할 때 주로 사용합니다.

/* 📖 서버는 응답과 함께 Set-Cookie 헤더를 전송할 수 있습니다. 
쿠키는 보통 브라우저에 의해 저장되며, 
그 후 쿠키는 같은 서버에 의해 만들어진 요청(Request)들의 Cookie HTTP 헤더안에 포함되어 전송됩니다. */
// 서버가 먼저 쿠키 전달 -> 브라우저에서 서버로 요청할때마다 쿠키 포함해서 전달

// const express = require("express")
// const app = express()
// const port = 3000

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

const http = require("http")
const cookie = require("cookie")
// https://www.npmjs.com/package/cookie
http.createServer((req, res) => {
    // res.writeHead(200, {
    //     'Set-Cookie': 'cookie1=choco'
    // })
    // res.writeHead(200, {
    //     'Set-Cookie': ['cookie1=choco','cookie2=strawberry']
    // })
    // 쿠기 기한 설정
    res.writeHead(200, {
        'Set-Cookie': [
            'cookie1=choco',
            'cookie2=strawberry',
            `Permeanent=cookies; Max-Age=${60*60*24}`,
            'Secure=secure; Secure', //HTTPS 만 전송
            'HTTPOnly=httpOnly; HttpOnly' // javascript로 제어 불가능 (XSS공격 방지)
            // document.cookie 입력하면 httpOnly는 나오지 않음
            // 그외에도 path, domain 등 여러 옵션이 있음
        ]
    })
    console.log(req.headers.cookie)
    let cookies = {}
    if (req.headers.cookie) { // cookie값이 없을 때 예외처리
        cookies = cookie.parse(req.headers.cookie)
        console.log(cookies.cookie1)
    }
    console.log(cookies)
    res.end("Cookie")
}).listen(3000)

/* ⚠️ 쿠키를 사용하는 게 데이터를 클라이언트 측에 저장할 수 있는 유일한 방법이었을 때는 이 방법이 타당했지만, 
지금은modern storage APIs를 사용해 정보를 저장하는 걸 권장합니다.
모든 요청마다 쿠키가 함께 전송되기 때문에, 성능이 떨어지는 원인이 될 수 있습니다. 
정보를 클라이언트 측에 저장하려면 Modern APIs의 종류인 웹 스토리지 API (localStorage와 sessionStorage) 와 IndexedDB를 사용하면 됩니다.
*/