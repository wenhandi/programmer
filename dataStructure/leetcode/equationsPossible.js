// 示例 1：

// 输入：["a==b","b!=a"]
// 输出：false
// 解释：如果我们指定，a = 1 且 b = 1，那么可以满足第一个方程，但无法满足第二个方程。没有办法分配变量同时满足这两个方程。

// 示例 2：

// 输入：["b==a","a==b"]
// 输出：true
// 解释：我们可以指定 a = 1 且 b = 1 以满足满足这两个方程。



/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function(equations) {
    let equalArr = [], notEqualArr = [];
    for(var i =0,len = equations.length; i<len; i++){
        let ex = equations[i]
        // 不相等
        let tmpObj = {}
        if(ex.includes("!")){
            let arr = ex.split("!=")
            
            notEqualArr.push(arr[0]).push(arr[1])
        }else{
            let arr = ex.split("==")
            
            equalArr.push(arr[0]).push(arr[1])
        }
    }

    equalArr = Array.from(new Set(equalArr))
    notEqualArr = Array.from(new Set(notEqualArr))
    
    if()
};