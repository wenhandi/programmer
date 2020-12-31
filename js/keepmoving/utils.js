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
    console.log("解析前的url", url)
    // url解码
    url = decodeURIComponent(url)
    let result = {}
    let hasList = false
    let list = []
    let questionMaskIndex = url.indexOf("?")
    // 取出url中的查询字符串
    let qs = url.substring(questionMaskIndex + 1)
    // 字符串分割成数组
    let qsArr = qs.split("&")
    console.log(qsArr)
    qsArr.forEach(item => {
        let equalSignIndex = item.indexOf("="), key, val;
        // 单独处理
        if (equalSignIndex !== -1) {
            key = item.substring(0, equalSignIndex)
            val = item.substring(equalSignIndex + 1)
        } else {
            // 只有key值，“=”都没有
            key = item
            val = ""
        }
        // 数组
        if (key === "list[]") {
            hasList = true
            list.push(val)
        }else{
            // json
            if (key === "json") {
                // json反序列化
                val = JSON.parse(val)
            }
            result[key] = val
        }
    })
    if (hasList) {
        result.list = list
    }
    console.log("解析后的url", result)
}

urlParse(url)