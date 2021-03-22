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
//  思路1：挑出不重复的组成新数组
//  思路2：从旧数组挑出重复的元素

function isObject(raw) {
    // 从原型链上通过toString获取Class
    // 类型有自己的toString 不同于 Objective.prototype.toString
    return Object.prototype.toString.call(raw) === "[object Object]"
}

function sortObj(rawObj){
    let keyArr = Object.keys(rawObj).sort()
    var result = {}
    keyArr.forEach(i => {
        let curE = rawObj[i]
        if(isObject(curE)){
            result[i] = sortObj(curE)
        }else{
            result[i] = curE
        }
    })
    
    return result
}

function uniqueArray(sourceArray) {
    let jstr = JSON.stringify
    let result = []
    let obj = {}

    sourceArray.forEach(element => {
        if(isObject(element)){
            element = sortObj(element)
        } 
        // 对象key不区分
        let key = element+jstr(element)
        if(!obj[key]){
            obj[key] = element
            result.push(element)
        }
    });
    console.log(jstr(sourceArray), " -> " ,jstr(result))
    // return result
}


uniqueArray([1, '1', 1])
uniqueArray([{ a: 1 }, { b: 1 }, { a: 1 }])
uniqueArray([{ a: 1, b: 2 }, { b: 1 }, { a: 1, b: 2 }])
uniqueArray([[1, { a: 1 }], [2], [3], [1, { a: 1 }]])
uniqueArray([{ a: 1, b: 2 }, { b: 1 }, { b: 2, a: 1 }])
