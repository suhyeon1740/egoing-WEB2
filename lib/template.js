//lib: 라이브러리를 줄여서 lib이라고 많이 함
//라이브러리는 재사용 가능한 작은 조각의 로직들 또는 작은 프로그램들을 라이브러리라고 함
module.exports = {
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

//module.exports = template // 이렇게 해도 됨