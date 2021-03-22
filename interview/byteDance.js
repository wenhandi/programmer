
// 1、vue2.x vue3.x响应式原理

// 2、虚拟DOM  diff算法时机  细节

// 3、nextTick

// 4、生命周期


// 虚拟DOM
// 哪个生命周期
// 所有


// data哪个生命周期

// data  数据监听哪个阶段
// vue 2.x  3.x区别



// 排序算法
// 时间复杂度

// 笔试题

// 树查找
// 深度广度优先



// 宏任务微任务
console.log(1);
setTimeout(function () { console.log(2); }, 0);
new Promise(resolve => {
    console.log(3);
    resolve();
}).then(() => {
    console.log(4);
})
console.log(5);



// 2、1、查找节点findNode(tree, id)
// 输入：树形json，节点id
// 输出：查找路径(1 -> 4 -> 6)
var path = {
    1: "1",
    2: "1 -> 2",
    3: "1 -> 3",
    4: "1 -> 4",
    5: "1 -> 3 -> 5",
    6: "1 -> 4 -> 6",
}

var tree = {
    id: 1,
    children: [
        {
            id: 2,
            children: []
        },
        {
            id: 3,
            children: [
                {
                    id: 5,
                    children: []
                }
            ]
        },
        {
            id: 4,
            children: [
                {
                    id: 6,
                    children: []
                }
            ]
        },
    ]
}


function findNode(tree, id, arr = []) {
    arr.push(tree.id)
    if (tree.id === id) {
        console.log("查找值" + id, "正确值" + path[id], "实际值" + arr.join("->"))
        return arr
    }
    tree.children.forEach(item => {
        // 递归的找
        let result = findNode(item, id, arr)
        if (result) {
            return result
        }
    })
    // 合适的push不合适的pop
        // pop触发很反直觉  当前id不合适时  遍历它的children 直到children没有的时候触发pop
        // 入参统一成  数组更易理解  这样pop不在循环外边
    // 一切都是基本功
    // 计算机真tm强大
    arr.pop()
    return false
}

findNode(tree, 1)
findNode(tree, 2)
findNode(tree, 3)
findNode(tree, 4)
findNode(tree, 5)
findNode(tree, 6)



// 3、常见排序（时间复杂度）
// 合并两个数组，返回有序的数组，sortType: 0 升序，1降序
// arr1: [3,2,5]
// arr2: [1,2,3]
function mergeArr(arr1, arr2, sortType) {
    
}