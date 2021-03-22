// asyFn1、asyFn2、syFn1依次执行，输出task 1 task 2 task 3
function asyFn1() {
    setTimeout(() => {
        console.log("task 1")
    }, 3000)
}

function asyFn2() {
    setTimeout(() => {
        console.log("task 2")
    }, 300)
}

function syFn2() {
    console.log("task 3")
}




// 回调地狱
// 改造：异步函数增加回调
function asyFn1(cb) {
    setTimeout(() => {
        console.log("task 1")
        typeof cb === "function" && cb()
    }, 3000)
}
function asyFn2(cb) {
    setTimeout(() => {
        console.log("task 2")
        typeof cb === "function" && cb()
    }, 1000)
}
function asyFn3(cb) {
    setTimeout(() => {
        console.log("task 3")
        typeof cb === "function" && cb()
    }, 300)
}


asyFn1(asyFn2(asyFn3))

// promise


// async    await
async function fn() {
    await asyFn1()
    await asyFn2()
    syncFn()
}