// https://leetcode-cn.com/problems/broken-calculator/
// 在显示着数字的坏计算器上，我们可以执行以下两种操作：

// 双倍（Double）：将显示屏上的数字乘 2；
// 递减（Decrement）：将显示屏上的数字减 1 。
// 最初，计算器显示数字 X。

// 返回显示数字 Y 所需的最小操作数。


/**
 * @param {number} X
 * @param {number} Y
 * @return {number}
 */
var brokenCalc = function(X, Y) {
    var opt = 0
    if(X >= Y){
        // 直接做差值
        return X - Y
    }else{
        ++ opt
        if(X < Y){
            // 双倍
            opt = brokenCalc(X*X, Y)
        }
    } 
    return opt
};

// brokenCalc(2, 3)        //2
brokenCalc(5, 8)        //18
// brokenCalc(11, 10)      //1