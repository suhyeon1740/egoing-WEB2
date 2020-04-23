var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring')

var template = {
    html: function (title, list, body, control) {
        var template = `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - HTML</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB - ${title}</a></h1>
        ${list}   
        ${control}
        ${body}
        </body>
        </html>
        `
        return template
    },
    list: function (fileList) {
        var list = '<ul>'
        for (var i = 0; i < fileList.length; i++) {
            list += `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`
        }
        list += '</ul>'
        return list
    }
}
// request : 요청과 관련된 정보
// response: 응답과 관련된 정보
var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //querystring 가져오기    
    var pathname = url.parse(_url).pathname //url.parse()메소드는 URL 문자열을 가져와 구문 분석 한 후 URL 객체를 반환합니다.
    if ( pathname === '/') {
        if (queryData.id === undefined) { 
            fs.readdir('./data', function (error, fileList) {
                var list = template.list(fileList)
                var title = 'Welcome'
                var description = 'Hello, Node.js'
                var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`, `<a href="/create">create</a>`)
                response.writeHead(200); // 200: 성공 , 404: 찾을 수 없음
                response.end(html); 
            })            
        } else {
            fs.readdir('./data', function (error, fileList) {
                fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {                
                    var title = queryData.id   
                    var list = template.list(fileList)
                    var html = template.html(title, list, `<h2>${title}</h2><p>${description}</p>`, 
                        `<a href="/create">create</a> <a href="/update?id=${title}">update</a> 
                         <form method="post" action="/delete_process">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                         </form>`)
                    response.writeHead(200); // 200: 성공 , 404: 찾을 수 없음
                    response.end(html);
                })
            })
        }        
    } else if( pathname === '/create') {
        fs.readdir('./data', function (error, fileList) {
            var list = template.list(fileList)
            var title = 'WEB - create'
            var html = template.html(title, list, `
            <form action="/process_create" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
                <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>
            `, '')
            response.writeHead(200);
            response.end(html);
        })         
    } else if ( pathname === '/process_create') {
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
                var list = template.list(fileList)
                var html = template.html(title, list, `
                <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${title}"/>
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p>
                    <textarea name="description" id="" cols="30" rows="10" placeholder="description">${description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>
                `, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`)
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
    } else {
        response.writeHead(404)
        response.end("Not found")
    }
    
});
app.listen(3000);