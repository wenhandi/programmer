
// 类型系统
// typeof 问题
typeof null === "object"
typeof {}  === "object"

// ==   类型转换
// ===  
+0 === -0   // true
NaN === NaN // false

Object.is(NaN, NaN)
Object.is(NaN, NaN)

var a = "sgjkkl"
var b = new String("sgjkkl")
console.log("a", a instanceof String)
console.log("b", b instanceof String)


function isObject(raw){
    // 从原型链上通过toString获取Class
    // 类型有自己的toString 不同于 Objective.prototype.toString
    return Object.prototype.toString.call(raw) === "[object Object]"
}
// todo换成其他方法
function isArray(raw){
    return Object.prototype.toString.call(raw) === "[object Array]"
}

// 基本类型
function isSimpleType(raw){
    let curClass = Object.prototype.toString.call(raw)
    return  curClass !== "[object Object]" && curClass !== "[object Array]"
}

