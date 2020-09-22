var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring')
var template = require('./lib/template.js')
const cookie = require("cookie")
// request : 요청과 관련된 정보
// response: 응답과 관련된 정보

function authIsOwner(req, res) {
    let isOwner = false
    let cookies = {}
    if(req.headers.cookie) {
        cookies = cookie.parse(req.headers.cookie)
    }
    if (cookies.email == "admin@gmail.com" && cookies.password == "1111") {
        isOwner = true
    }
    return isOwner
}

function setLoginStatus(request, response) {
    if (authIsOwner(request, response)) {
        return `<a href="/logout_process">Logout</a>`
    } else {
        return `<a href="/login">Login</a>`
    }
}
var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //querystring 가져오기    
    var pathname = url.parse(_url).pathname //url.parse()메소드는 URL 문자열을 가져와 구문 분석 한 후 URL 객체를 반환합니다.
    if ( pathname === '/') {
        if (queryData.id === undefined) { 
            fs.readdir('./data', function (error, fileList) {
                var title = 'Welcome'
                var description = 'Hello, Node.js'
                var html = template.html(title, fileList, `<h2>${title}</h2><p>${description}</p>`, `<a href="/create">create</a>`, setLoginStatus(request, response))
                response.writeHead(200); // 200: 성공 , 404: 찾을 수 없음
                response.end(html); 
            })            
        } else {
            fs.readdir('./data', function (error, fileList) {
                fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {                
                    var title = queryData.id   
                    var form = template.form('/delete_process', title)
                    var html = template.html(title, fileList, `<h2>${title}</h2><p>${description}</p>${form}`, 
                        `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`,
                        setLoginStatus(request, response))
                    response.writeHead(200); // 200: 성공 , 404: 찾을 수 없음
                    response.end(html);
                })
            })
        }        
    } else if( pathname === '/create') {
        fs.readdir('./data', function (error, fileList) {
            var title = 'WEB - create'
            var form = template.form('/process_create')
            var html = template.html(title, fileList, form, '', setLoginStatus(request, response))
            response.writeHead(200);
            response.end(html);
        })         
    } else if ( pathname === '/process_create') {
        if (!authIsOwner(request, response)) {
            response.end('Login Required!')
            // return false;
        }
        var body = '';
        // post 데이터가 너무 많은걸 대비해 data를 조각조각 나눠서 받음
        // data를 받을때마다 아래처럼 body에 데이터를 추가해줌
        request.on('data', function (data) {
            body += data;
        })
        // 더이상 받을 데이터가 없으면 end 이벤트가 실행됨
        request.on('end', function () {
            var post = qs.parse(body)
            var title = post.title
            var description = post.description
            fs.writeFile(`data/${title}`, description, 'utf8', function(err) {                
                // 리다이랙션: 사용자를 다른 주소로 보내버림
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            })
        })    
    } else if (pathname === '/update') {
        fs.readdir('./data', function (error, fileList) {
            fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {
                var title = queryData.id
                var form = template.form('/update_process', title, description)
                var html = template.html(title, fileList, form, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`,
                    setLoginStatus(request, response))
                response.writeHead(200);
                response.end(html);
            })            
        })
    } else if( pathname === '/update_process') {
        var body = '';        
        request.on('data', function (data) {
            body += data;
        })        
        request.on('end', function () {
            var post = qs.parse(body)
            var id = post.id
            var title = post.title
            var description = post.description
            fs.rename(`data/${id}`, `data/${title}`, function() {
                fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                    // 리다이랙션: 사용자를 다른 주소로 보내버림
                    response.writeHead(302, { Location: `/?id=${title}` });
                    response.end();
                })
            })            
        })   
    } else if (pathname === '/delete_process') {
        var body = '';        
        request.on('data', function (data) {
            body += data;
        })        
        request.on('end', function () {
            var post = qs.parse(body)
            var id = post.id
            fs.unlink(`data/${id}`, function(err) {
                response.writeHead(302, { Location: `/` });
                response.end();
            })        
        }) 
    } else if (pathname === "/login") {
        fs.readdir("./data", function (error, filelist) {
            var title = "Login"
            var list = []//template.list(filelist)
            var html = template.html(
                title,
                list,
                `<form action="login_process" method="post">
                <p><input type="text" name="email" placeholder="email" /></p>
                <p><input type="password" name="password" placeholder="password" /></p>
                <p><input type="submit" /></p>
                </form>`,
                `<a href="/create">create</a>`,
                setLoginStatus(request, response)
            )
            response.writeHead(200)
            response.end(html)
            console.log(html)
        })
    } else if (pathname === "/login_process") {
        var body = ""
        request.on("data", function (data) {
            body = body + data
        })
        request.on("end", function () {
            const post = qs.parse(body)
            if (post.email === "admin@gmail.com" && post.password === "1111") {
                response.writeHead(302, {
                    "Set-Cookie": [
                        `email=${post.email}`,
                        `password=${post.password}`,
                        `nickname=stupid`,
                    ],
                    Location: "/",
                })
                response.end()
            } else {
                response.end("??")
            }
        })
    } else if (pathname === "/logout_process") {
        var body = ""
        request.on("data", function (data) {
            body = body + data
        })
        request.on("end", function () {
            const post = qs.parse(body)
            response.writeHead(302, {
                "Set-Cookie": [
                    `email=; Max-age=0`,
                    `password=; Max-age=0`,
                    `nickname=; Max-age=0`,
                ],
                Location: "/",
            })
            response.end()            
        })
    } else {
        response.writeHead(404)
        response.end("Not found")
    }
    
});
app.listen(3000);