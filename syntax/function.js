function sum(first, second) { //parameter
    console.log('a')
    // return: 어떤 값을 출력한다는 의미와 함수를 종료시킨다는 두 가지 의미를 가지고 있음
    return first + second 
    console.log('b')
}
// 값을 리턴한다면 함수의 출력을 받아서 다양한 용도로 사용할 수 있음
// 변수에 담거나, 어떤 함수에 바로 넘겨주거나 등
// 그런데 sum에서 콘솔을 바로 찍는다면 sum은 다양한 용도로 사용할 수 없음
console.log(sum(2, 4)) //argument