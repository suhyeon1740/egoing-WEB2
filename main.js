var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //querystring 가져오기
    var title = queryData.id
    if (_url == '/') {
        title = "Welcome"
    }
    if (url == '/favicon.ico') {
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
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
        response.end(template);
    })
});
app.listen(3000);