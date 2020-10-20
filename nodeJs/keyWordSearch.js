/**
 * 使用nodeJs遍历目录文件，正则匹配关键字搜索console.log打印输出
 */
var path = require("path");
var fs = require("fs");
// 目录
var filePaths = ["/Users/xupan/smartX/grampus-wxapp/page/", "/Users/xupan/smartX/grampus-wxapp/pages/", "/Users/xupan/smartX/grampus-wxapp/utils/services/"]
// var filePaths = ["/Users/xupan/smartX/grampus-wxapp/utils/services/userinfo.js"]
console.log("开始.........")
filePaths.forEach(function (filePath) {
    recursiveReadFile(filePath);
})

function recursiveReadFile(fileName) {
    if (!fs.existsSync(fileName)) return;
    if (isFile(fileName)) {
        check(fileName);
    }

    if (isDirectory(fileName)) {
        var files = fs.readdirSync(fileName);
        files.forEach(function (val) {
            // 不断拼接直到找到文件
            var temp = path.join(fileName, val);
            if (isDirectory(temp)) recursiveReadFile(temp);
            if (isFile(temp)) check(temp);
        })
    }
}

function check(fileName) {
    var data = readFile(fileName);
    // var regExp = /(?=getRequestUrl)\(('\w+')\)/g
    // var regExp = /getRequestUrl\((('|")\w+('|"))\)/g
    // 匹配getRequestApiUrl("xxxx") 或者 getRequestApiUrl('xxxx') 
    var regExp = /getRequestApiUrl\((('|")\w+('|"))\)/g
    var res = data.match(regExp)
    if (res && res.length) {
        // console.log(111111, res.length)
        // console.log(fileName, "\n"+res.join("\n"));
        // 跨行打印
        console.log("\n" + res.join("\n"));
    }
}

function isDirectory(fileName) {
    if (fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();

}

function isFile(fileName) {
    if (fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
}

function readFile(fileName) {
    if (fs.existsSync(fileName)) return fs.readFileSync(fileName, "utf-8");
}

