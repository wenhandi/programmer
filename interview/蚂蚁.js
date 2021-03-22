// rem 
//     公式
window.onload = function () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    document.body.style.fontSize = '16px';
  }
  window.onresize = function () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
    document.body.style.fontSize = '16px';
  }

// 首屏加载优化

// Plugin
// loader  

// npm run build之后的静态资源上传cdn适合放到 plugin  还是 loader




/*
 问题：给定一个无序数组，求数组中最长的连续整数个数
*/

function longN(arr){
    let i = 0
    let conArr = []
    let result = []
    // 存入数组 len-1 ++ 和 nextE 比较，不相等清空前把长度记录到到新数组
    // 一个数组
    
    do{
        conArr.push(arr[i])
        ++i
        if(++conArr[conArr.length - 1] !== arr[i]){
            result.push(conArr.length)
            conArr = []
        }

    }while(i <= arr.length)

    // 时间复杂度太高
    return Math.max.apply(null, result)

}

longN([1,2,3,7,4,5,6,9])

/*
问题：一个严格递增数列，末尾部分移动到最前端，寻找最小值的位置，语言不限
例如
  输入: [4,5,6,1,2,3]
  输出: 3

详细
 对于一个严格递增数列123456， 某末端移动到最前端，变为了456123， 寻找最小值点1的位置3。
*/
function getMinVal(arr){
    let index
    for(let i=0, len = arr.length; i< len; i++){
        if(arr[i] > arr[i+1]){
            index = i+1
            break
        }
    }

    return index
}
getMinVal([4,5,6,1,2,3])

/*
问题：如果使用过react/vue/angular,  完成自定义 select，要求支持前端搜索，点击时回调
*/