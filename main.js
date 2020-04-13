var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query; //querystring 가져오기
    console.log(queryData.id)
    if (_url == '/') {
        _url = '/index.html';
    }
    if (url == '/favicon.ico') {
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    // console.log(__dirname + url)
    // __dirname: main.js 파일이 있는 디렉토리 위치
    // url: 클라이언트가 요청한 url
    response.end(queryData.id);

});
app.listen(3000);