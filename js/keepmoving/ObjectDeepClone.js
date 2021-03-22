// 对象深拷贝
function isObject(raw) {
    // 从原型链上通过toString获取Class
    // 类型有自己的toString 不同于 Objective.prototype.toString
    return Object.prototype.toString.call(raw) === "[object Object]"
}
function deepClone(source) {
    let result = {}
    // for ...in遍历对象
    for(var i in source){
        // hasOwnProperty排除继承属性
        if(source.hasOwnProperty(i)){
            if(isObject(source[i])){
                // 递归赋值
                result[i] = deepClone(source[i])
            }else{
                result[i] = source[i]
            }         
        }
    }
    console.log("result", result)
    // 递归一定要返回 因为要被用到
    // 关键点当前result必须被返回，因为递归赋值实现的
    return result
}

var a1 = { b: { c: { d: 1 } } };
deepClone(a1)


var a2 = JSON.parse(JSON.stringify(a1))





function cloneLoop(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];


    // 破解递归爆栈方法
    // 1、消除尾递归
    // 2、递归改循环
    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}

cloneLoop({ b: { c: { d: 1 } } })