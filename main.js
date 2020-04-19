var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //querystring 가져오기    
    var pathname = url.parse(_url).pathname //url.parse()메소드는 URL 문자열을 가져와 구문 분석 한 후 URL 객체를 반환합니다.
    if ( pathname === '/') {
        if (queryData.id === undefined) { 
            fs.readdir('./data', function (error, fileList) {
                var list = '<ul>'
                for (var i = 0; i < fileList.length; i++) {
                    list += `<li><a href="?id=${fileList[i]}">${fileList[i]}</a></li>`
                }
                list += '</ul>'
                var title = 'Welcome'
                var description = 'Hello, Node.js'
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
            fs.readdir('./data', function (error, fileList) {
                var list = '<ul>'
                for (var i = 0; i < fileList.length; i++) {
                    list += `<li><a href="?id=${fileList[i]}">${fileList[i]}</a></li>`
                }
                list += '</ul>'
                fs.readFile(`data/${queryData.id}`, 'utf8', (err, description) => {                
                    var title = queryData.id   
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
            })
        }        
    } else {
        response.writeHead(404)
        response.end("Not found")
    }
    
});
app.listen(3000);