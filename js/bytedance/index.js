

// 笔试题


// 宏任务微任务执行顺序
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
var tree =
{
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

// 树遍历方法
// 前后中序遍历

// 树查找方法
// 广度优先
// 深度优先


// 递归要领
// 递归公式 当前id+"->"下一个id
// 终止条件 找到id

let path = ""
function findNode(tree, id) {
    if(tree.id === id){
        return path + id
    }else{
        // 清空本轮path
        if(tree.children.length ===0){
            path = ""
        }else{
            // 
            tree.children.forEach(item => {
                path = path + "->" + item.id
                findNode(item, id)
            })
        }
    }
    
}

findNode(tree, 2)
findNode(tree, 3)
findNode(tree, 4)
findNode(tree, 5)
findNode(tree, 6)

// 3、合并两个数组，返回有序的数组，sortType: 0 升序，1降序
var arr1 = [3, 2, 5]
var arr2 = [1, 2, 3]
function mergeArr(arr1, arr2, sortType) {
    let arr = arr1.concat(arr2)
    arr.sort((a, b) => {
        return sortType === 0 ? a - b : b - a
    })

    console.log(sortType === 0 ? "升序" : "降序", arr)
}

mergeArr(arr1, arr2, 0)
mergeArr(arr1, arr2, 1)