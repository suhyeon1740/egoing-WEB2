var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //querystring 가져오기
    var title = queryData.id   
    var pathname = url.parse(_url).pathname //url.parse()메소드는 URL 문자열을 가져와 구문 분석 한 후 URL 객체를 반환합니다.
    if ( pathname === '/') {
        fs.readFile(`data/${title}`, 'utf8', (err, description) => {
            var template = `
            <!doctype html>
            <html>
            <head>
            <title>WEB1 - HTML</title>
            <meta charset="utf-8">
            </head>
            <body>
            <h1><a href="/">WEB - ${title}</a></h1>
            <ol>
                <li><a href="?id=HTML">HTML</a></li>
                <li><a href="?id=CSS">CSS</a></li>
                <li><a href="?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>
                ${description}
            </p>
            </body>
            </html>
            `
            response.writeHead(200); // 200: 성공 , 404: 찾을 수 없음
            response.end(template);
        })
    } else {
        response.writeHead(404)
        response.end("Not found")
    }
    
});
app.listen(3000);