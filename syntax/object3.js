// var q = {
//     v1: 'v1',
//     v2: 'v2',
//     f1: function() {
//         console.log(q.v1)
//     },
//     f2: function() {
//         console.log(q.v2)
//     }
// }

// q.f1()
// q.f2()

// var t = {
//     v1: 'v1',
//     v2: 'v2',
//     f1: function () {
//         console.log(q.v1) // 객체 이름을 q에서 t로 바꾼다면 에러 발생
//     },
//     f2: function () {
//         console.log(q.v2)
//     }
// }

// q.f1()
// q.f2()

var t = {
    v1: 'v1',
    v2: 'v2',
    f1: function () {
        console.log(this.v1) // this를 사용하면 객체 이름은 신경안써도 됨
    },
    f2: function () {
        console.log(this.v2)
    }
}

t.f1()
t.f2()