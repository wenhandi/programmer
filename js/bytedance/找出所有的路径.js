// 图表达能力强  搜索

// 高级搜索算法
// A* IDA*
// 暴力搜索算法 时间复杂度 O(E)  空间复杂度 O(V)
// 广度优先 BFS
// 队列

// 深度优先 DFS
// 回溯思想
// 递归实现
// 栈实现
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
    if(tree.id === id){
        console.log(arr)
        return arr
    }else{
        tree.children.forEach(element => {
            let result = findNode(element, id, arr)
            if(result){
                return
            }
        });
        arr.pop()
    }
}

findNode(tree, 1)
findNode(tree, 2)
findNode(tree, 3)
findNode(tree, 4)
findNode(tree, 5)
findNode(tree, 6)