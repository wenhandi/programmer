// 传说罗马人占领了乔塔帕特，41 个犹太人被围堵在一个山洞里。他们拒绝被俘虏，而决定集体自杀，

// 大家决定了一个自杀方案，41 个人围成一个圈，由第 1 个人开始顺时针报数，每报数为 3 的人立刻自杀，然后再由下一个人重新从 1 开始报数，依旧是每报数为 3 的人立刻自杀，依次循环下去。
// 其中两位犹太人并不想自杀，是数学家约瑟夫和他的朋友，他们发现了自杀方案的规律，选了两个特定的位置，最后只剩下他们两人，而活了下来。那么这两个位置分别是什么？

// 这个问题转化成要解决的通用问题：
// 即 n 个人围成一个圈，这 n 个人的编号从 0——(n - 1) ， 第一个人（编号为0的人）从 1 开始报数，报数为 m 的人离开，
// 再从下一个开始从 1 开始报数，报数为 m 的人离开，依次循环下去，直到剩下最后一个人（也可以剩最后两个，少循环一次就是了），那么，把最后一个人的编号打印出来。

// 循环链表
function Llist(){
    this.head = new Node("head")
    this.head.next = this.head
    this.find = find;
    this.findPrevious = findPrevious;
    this.insert = insert;
    this.remove = remove;
}

// 节点方法
function Node(element){
    this.element = element
    this.next = null
}

function insert(newElement, item){
    var newNode = new Node(newElement) 
    var curNode = this.find(item)
    newNode.next = curNode.next
    curNode.next = newNode
}

function remove(item){
    var previousNode = this.findPrevious(item)
    previousNode.next = previousNode.next.next
}

function find(item){
    var curNode = this.head
    debugger
    while(curNode.element !== item){
        curNode = curNode.next
    }
    return curNode
}

function findPrevious(item){
    var curNode = this.head
    while(curNode.next.element !== item){
        curNode = curNode.next
    }
    return curNode
}

function display(){
    var curNode = this.head
    while(curNode.next && curNode.next.element !== this.head.element){
        console.log(curNode.next.element)
        curNode = curNode.next
    }
}



function josephRing(n = 40, m = 3, saveN = 2){
    // 边界判断
    if(n < m || saveN > m){
        console.log("参数不合法")
        return
    }
    var lineList = new Llist()
    for(var i =0; i< n; i++){
        var item = i> 0 ? i : lineList.head.element
        lineList.insert(i, item)
    }

    var curNode = lineList.head.next
    while(curNode.next.next ){
        curNode = curNode.next.next
        lineList.remove(curNode)
        // 删除元素的后一个元素
        curNode = curNode.next
        lineList.display()
    }


}

josephRing()