// 1、技术亮点
// 2、前端工程化
// 3、Node.js 实际开发
// 4、react.js


// 4、笔试题目
// ['abc', 'def', 'hig'] => ['adh', 'bei', 'cfg']

function formatArr(arr){
    // 空数组累加  会出现undefined+"a"
    // 初始化数组
    let result = []
    result.length = arr.length
    result.fill("")
    console.log("初始化数组为", result)

    // 因为需要最小粒度所以需俩次循环遍历
    arr.forEach((element) => {
        let curArr = element.split("")
        curArr.forEach((item, i) => {
            // 操作数组的三个元素
            result[i] += item
        })
    });
    return result
}

formatArr(['abc', 'def', 'hig'])


function formatArr2(arr){
    // 空数组累加  会出现undefined+"a"
    let result = []

    // 因为需要最小粒度所以需俩次循环遍历
    arr.forEach((element) => {
        let curArr = element.split("")
        curArr.forEach((item, i) => {
            let curElem = result[i]
            if(curElem === undefined){
                curElem = ""
            }
            curElem += item
        })
    });
    return result
}

formatArr2(['abc', 'def', 'hig'])





