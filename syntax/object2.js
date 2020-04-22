// var i = if(true) {console.log(1)}
// i()

// var s = switch (true) {    
//     default:
//         console.log(1)
//         break;
// }
// s()

var f = function () {
    console.log(1)
    console.log(2)
}
f()

var a = [f]
a[0]()

var o = {
    func: f
}
o.func()

// 함수 표현식(<->함수선언식)에서 함수이름을 설정하면 함수 내부에서만 그 이름을 사용할 수 있다.
// var f = function ff() {
//     console.log(1)
//     console.log(2)
//     ff()
// }
// f()
// ff() // error

