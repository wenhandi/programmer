
function repeatEle(curEle, otherEle){
    // 简单类型
    if(typeof curEle !== "object" && typeof otherEle !== "object"){
        if(curEle === otherEle){
            return true
        }else{
            return false
        }
    }else{

    }
}
function uniqueArray(arr){
    let len = arr.length
    for(let i=0; i< len; i++){
        console.log(1111)
        for(let j=i+1; j< len; j++){
            if(repeatEle(arr[i], arr[j])){
                arr.splice(j, 1)
                console.log("j", j)
            }
        }
    }
    console.log("去重后数组", arr)
    return arr
}

// uniqueArray([1,'1',1,5,6,4,7,9,'9'])
uniqueArray([{a: 1}, {b: 1}, {a: 1}])