// 3、常见排序（时间复杂度）
// 合并两个数组，返回有序的数组，sortType: 0 升序，1降序
var arr1 = [3, 2, 5]
var arr2 = [1, 2, 3]
function mergeArr1(arr1, arr2, sortType) {
    // 利用js api
    let arr3 = arr1.concat(arr2)
    arr3.sort((a, b) => {
        return sortType === 0 ? a - b : b - a
    })
}


mergeArr1(arr1, arr2, 0)
mergeArr1(arr1, arr2, 1)



// 冒泡：比较相邻 互换
function mergeArr2(arr1, arr2, sortType) {

}
// 选择
function mergeArr2(arr1, arr2, sortType) {

}
// 插入
function mergeArr2(arr1, arr2, sortType) {

}


// 希尔
function mergeArr2(arr1, arr2, sortType) {

}


// 归并排序  
// 自顶向下  递归可能爆栈
// 自下而上  迭代  
function mergeSort(arr) {
    arr
}
mergeSort([3, 2, 5, 1, 2, 3])

// 快排 分治思想
function quickSort(arr) {
    if (arr.length === 0) {
        return []
    }
    let lesser = []
    let greater = []
    let pivot = arr[0]
    // 从基准值后面开始遍历
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            lesser.push(arr[i])
        } else {
            greater.push(arr[i])
        }
    }
    // 单个元素的数组会作为基准值放到合适位置
    return quickSort(lesser).concat(pivot, quickSort(greater))
}

quickSort([3, 2, 5, 1, 2, 3])