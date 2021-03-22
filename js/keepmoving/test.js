/**
 * 3、数组去重
 * 
 * @example
 * [1,'1',1]                            -> [1,'1']
 * [{a: 1}, {b: 1}, {a: 1}]             -> [{a: 1}, {b: 1}]
 * [{a: 1, b: 2}, {b: 1}, {a: 1, b: 2}] -> [{a: 1, b: 2}, {b: 1}]
 * [[1, {a: 1}], [2], [3], [1, {a: 1}]] -> [[1, {a: 1}], [2], [3]]
 * [{a: 1, b: 2}, {b: 1}, {b: 2, a: 1}] -> [{a: 1, b: 2}, {b: 1}]
 */


function isObject(raw) {
    // 从原型链上通过toString获取Class
    // 类型有自己的toString 不同于 Objective.prototype.toString
    return Object.prototype.toString.call(raw) === "[object Object]"
}
// todo换成其他方法
function isArray(raw) {
    return Object.prototype.toString.call(raw) === "[object Array]"
}

// 基本类型
function isSimpleType(raw) {
    let curClass = Object.prototype.toString.call(raw)
    return curClass !== "[object Object]" && curClass !== "[object Array]"
}

function isObject(raw) {
    // 从原型链上通过toString获取Class
    // 类型有自己的toString 不同于 Objective.prototype.toString
    return Object.prototype.toString.call(raw) === "[object Object]"
}
var a1 = { b: { c: { d: 1 } } };
function clone(source) {
    let target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            if (isObject(source[i])) {
                target[i] = clone(source[i]); // 注意这里
            } else {
                target[i] = source[i];
            }
        }
    }
    console.log("target", target)
    return target;
}
clone(a1)

function deepClone2(source) {
    let result = null
    if (isSimpleType(source)) {
        // 基本类型
        result = source
    } else {
        if (isObject(source)) {
            // 对象
            let keys = Object.keys(source)
            // 遍历
            for (let key of keys) {
                let curVal = source[key]
                if(isSimpleType(curVal)){
                    result[key] = source[key]
                }else{
                    deepClone2(curVal)
                }
            }
        } else if (isArray(source)) {
            // 数组
            for(let key in source){
                if(isSimpleType(key)){
                    result.push(key)
                }else{
                    deepClone2(key)
                }
            }
        }
        result = source
    }
    console.log("result", result)
    return result
}

deepClone2(a1)