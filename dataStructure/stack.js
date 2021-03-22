// 编译器如何利用栈来实现表达式求值
var express = "3+5*8-6"

// 操作数
var stack1 = []
// 操作符
var stack2 = []

var strArr = express.split("")
strArr.forEach(item => {
    if(typeof item === "number"){
        stack1.push()
    }else{
        stack2.push()
    }
})

console.log("stack1", stack1)
console.log("stack1", stack1)


// 佩兹糖果盒

// 回文
var str = "kjkllkjk"
var str2 = "kjklolkjk"


// 栈常常被用来实现编程语言, 使用栈实现递归即为一例