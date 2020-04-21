// // function a() {
// //     console.log('A')
// // }

// var a = function() {
//     console.log('A')
// }
// // a라는 변수가 담고 있는 값인 함수를 실행
// // a()

// function slowFunc(callback) { // 이 함수의 실행이 끝나면 콜백 함수를 실행
//     callback()
// }

// slowFunc(a)

var fs = require('fs')

// var data
// fs.readFile('sample.txt', 'utf8', function (err, result) {
//     data = result
// })
// console.log(data)

fs.readFile('sample.txt', 'utf8', function (err, result) {
    console.log(result)
})