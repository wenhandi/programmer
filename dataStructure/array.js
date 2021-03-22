


var arr = new Array(10)
console.log(arr)
var arr2 = []
arr2.length = 10
console.log(arr2)


arr.fill(0)
arr.forEach((item, index) => {
    console.log(item, index)
})