// 배열과 객체는 정보를 정리정돈하는 수납상자
// 그런데 배열은 순서대로 저장 -> 고유한 숫자가 있고 0부터 시작
// 객체는 순서와 상관없이 저장 -> 숫자대신 이름을 줄 수 있음

var members = ['a', 'b', 'c']
// console.log(members[1])
for (var i = 0; i < members.length; i++) {
    console.log(members[i])
}

var roles = {
    'programmer': 'a',
    'designer': 'b',
    'manager': 'hoya'
}
// console.log(roles.designer)
for (var item in roles) {
    console.log(`roles: ${item}, name: ${roles[item]}`)
}