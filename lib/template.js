//lib: 라이브러리를 줄여서 lib이라고 많이 함
//라이브러리는 재사용 가능한 작은 조각의 로직들 또는 작은 프로그램들을 라이브러리라고 함
module.exports = {
    html: function (title, fileList, body, control) {
        var template = `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - HTML</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB - ${title}</a></h1>
        ${this.list(fileList)}   
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
    },
    form: function (url, title = '', description = '') {
        var form = `<form method="post" action="${url}">`       
        switch (url) {
            case '/delete_process':
                form += `<input type="hidden" name="id" value="${title}">
                        <input type="submit" value="delete">`
                break
            case '/process_create': case '/update_process':                
                if (url === '/update_process') form += `<input type="hidden" name="id" value="${title}"/>`
                console.log(title)
                form += `                    
                    <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                    <p>
                        <textarea name="description" id="" cols="30" rows="10" placeholder="description">${description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                    </form>`
                break
        }
        return form + '</form>'
    }
}

//module.exports = template // 이렇게 해도 됨