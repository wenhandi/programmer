// 递归 recursion
// 关键 递归公式+终止条件

// 优点
    // 简洁
// 问题：
    // 1、爆栈（空间复杂度高）
        // 计数控制递归深度
        // 递归改循环，最小规模子问题算出来然后再算次小规模问题，相当于归的过程
    // 2、性能(重复计算，过多函数调用耗时高)
    // 3、A-B-C-A


// 电影院座位在第几排
function f(n) {
    // 终止条件
    if (n === 1) return 1
    return f(n - 1) + 1
}

f(n)

function f2(n){
    var ret = 1
    for(var i =2; i<= n; i++){
        ret = ret + 1
    }
    return ret

}


// 爬楼梯，一步一个或者俩个台阶，问一共多少种情况？
function ff(n) {
    // 终止条件
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2
    }


    return ff(n - 1) + ff(n - 2)
}

ff(20)


function ff2(n) {
    // 终止条件
    if (n === 1) {
        return 1
    }
    if (n === 2) {
        return 2
    }
    
    var ret = 0
    var pre = 2
    var prepre = 1
    
    for(var i = 3; i<= n; i++){
        ret = prepre+ pre
        prepre = pre
        pre = ret
    }

    // return ff2(n - 1) + ff2(n - 2)
    return ret
}

ff2(20)


// 推荐注册返佣金   求最终推荐人

function findRootRefId(id){
    let curOne = findOne(id)
    if(!curOne.parent.id){
        return curOne.id
    }
    return findRootRefId(curOne.parent.id)
}