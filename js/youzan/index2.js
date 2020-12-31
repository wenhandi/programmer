// =====================================================
// 欢迎参加有赞前端 Coding 面试
// =====================================================
// 界面介绍：
//   上方设置按钮可以切换语言、字体大小、主题
//   右侧控制台可以显示代码执行结果，可用于编码过程中的 DEBUG
// =====================================================
// Coding 须知：
//   本次 Coding 时间限制为 45 分钟，共 3 道题，完成 2 道即可
// =====================================================

/**
 * 1、解析 url 中的 queryString
 *
 * 输入：https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D&qwe&www=
 * 输出：
 * {
 *  name: coder,
 *  age: 20,
 *  callback: https://youzan.com?name=test,
 *  list: [a, b],
 *  json: {
 *      str: 'abc',
 *      num: 123
 *  },
 *  qwe: '',
 *  www: '',
 * }
 */

const url = 'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D&qws&www=';
function urlParse(url) {
    const customKeys = ["json", "list[]"]
    // 解码
    url = decodeURIComponent(url)
    let result = {}
    let hasList = false
    let list = []
    let firstQ = url.indexOf("?")
    let qs = url.substring(firstQ + 1)
    let qsArr = qs.split("&")
    console.log(qsArr)
    qsArr.forEach(item => {
        let trueEqual = item.indexOf("=")
        let key
        let val
        // 单独处理
        if (trueEqual !== -1) {
            key = item.substring(0, trueEqual)
            val = item.substring(trueEqual + 1)
        } else {
            key = item
            val = ""
        }
        if (key === "list[]") {
            hasList = true
            list.push(val)
        }else{
            if (key === "json") {
                val = JSON.parse(val)
            }
            result[key] = val
        }
    })
    if (hasList) {
        result.list = list
    }
    console.log("result", result)
}

urlParse(url)


/**
 * 2、实现 getValue 函数，安全的获取目标对象指定 path 的值
 * @params {object | array} value 指定对象
 * @params {string} path
 */

const object = { 'a': [{ 'b': { 'c': 3 } }] }; // path: 'a[0].b.c'
const array = [{ "a": { b: [1] } }]; // path: '[0].a.b[0]'


function getValue(obj, path) {
    // let arr = path.split(".")
    // arr.forEach(item => {
    //     let arrFlag = item.includes("[") 
    //     if(arrFlag){
    //         arr[item]
    //     }
    // })
    // obj
}


/**
 * 3、数组去重
 * 
 * @example
 * [1,'1',1]                            -> [1,'1']
 * [{a: 1}, {b: 1}, {a: 1}]             -> [{a: 1}, {b: 1}]
 * [{a: 1, b: 2}, {b: 1}, {a: 1, b: 2}] -> [{a: 1, b: 2}, {b: 1}]
 * [[1, {a: 1}], [2], [3], [1, {a: 1}]] -> [[1, {a: 1}], [2], [3]]
 * [{a: 1, b: 2}, {b: 1}, {b: 2, a: 1}] -> [{a: 1, b: 2}, {b: 1}]
 */


function uniqueArray(array) {
    let tmpArr = []
    let result = []
    array.forEach(item => {
        if (tmpArr.indexOf(item) === -1) {
            result.push(item)
            tmpArr.push(item)
        }
    })
    console.log(result)
    return result
}


uniqueArray([1, '1', 1])


/**
 * 4、将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，
 * 例如110000000000000000000000000000000000000000000000，表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，也就是对应00:00~01:00这个时间区间。
 * 一个位图中可能有个不连续的时间区间被选中，例如110010000000000000000000000000000000000000000000，
 * 表示00:00~01:00和02:00~02:30这两个时间区间被选中了。
 * 写一个timeBitmapToRanges,将上述规则描述的时间位图转挨成一个选中时间区间的数组。
 */

function timeBitmapToRanges() { }