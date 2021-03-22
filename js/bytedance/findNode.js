// 树遍历方法
// 前后中序遍历

// 树查找方法
// 广度优先     O(n)
// 深度优先


// 递归要领
// 递归公式 当前id+"->"下一个id
// 终止条件 找到id



// 查找节点findNode(tree, id)
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

// 生产路径组成所有可能数组然后找包含并截取
// 优化 找到后补组数组了
function findNode(tree, id){
    let path = []
    let curId = tree.id
    path.push(curId)
    if(curId === id){
        return id
    }else{
        tree.children.forEach((item, i) => {
            path[i] = [id, item.id]
        })
    }
}

function findNode(tree, id){
    let path = []
    path.push(id)
    if(tree.id === id){
        return path.join("->")
    }else{
        find(tree.children) 
    }
}

var path = ""
function findNode2(tree, id) {
    var curId = tree.id
    if (curId === id) {
        path += curId
    } else {
        path += "->" + curId
        // 深度遍历完一个  没找到   清空本轮path
        if (tree.children.length === 0) {
            path = ""
        } else {
            tree.children.forEach(item => {
                findNode(item, id)
            })
        }
    }
    return path
}

// 广度优先
function findNodeWidth(tree, id) {
    var curId = tree.id
    if (curId === id) {
        return id
    } else {

        // 深度遍历完一个  没找到   清空本轮path
        tree.children.forEach(item => {
            item.id === id
            
        })

    }
    return path
}





findNode(tree, 2)
console.log(path)
// findNode(tree, 3)
// findNode(tree, 4)
// findNode(tree, 5)
// findNode(tree, 6)
