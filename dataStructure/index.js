// 队列：不同于现实生活中的队列  每个元素不具有自主能动性  为了降低时间复杂度，当队尾无空闲空间时集中数据搬移
// 入队
function enqueue(item){
    // 队尾已满
    if(tail === n){
        // 队列满了
        if(head == 0) return false
        // 数据搬移
        for(var i = head; i< tail; i++){
            items[i-head] = items[i]
        }
        // 搬移后重新更新head tail
        tail -= head
        head = 0
    }

    items[tail] = item
    ++tail
    return true
}