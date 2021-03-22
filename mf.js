let d = {

    /**
    * 通过读取某一个目录文件，获取该目录下所有的wxss和wxml文件列表
    * fileWxmlList
    * fileWxssList
    */
    readDirRecur: function (folder, callback) {
        var _this = this
        fs.readdir(folder, function (err, files) {
            var count = 0
            var checkEnd = function () {
                ++count == files.length && callback()
            }
            files.forEach(function (file) {
                var fullPath = folder + '/' + file
                fs.stat(fullPath, function (err, stats) {
                    // 如果是文件夹，深度遍历
                    if (stats.isDirectory()) {
                        return _this.readDirRecur(fullPath, checkEnd)
                    } else {
                        /* not use ignore files */
                        // 过滤wxss文件
                        if (typeof fullPath === 'string' && file.indexOf('.wxss') != -1) {
                            // 过滤wxss文件
                            _this.fileWxssList.push(fullPath)
                        }
                        if (typeof fullPath === 'string' && file.indexOf('.wxml') != -1) {
                            // 过滤wxss文件
                            _this.fileWxmlList.push(fullPath)
                        }
                        checkEnd()
                    }
                })
            })
            // 为空时直接回调
            files.length === 0 && callback()
        })
    },
    /**
    * 对数组去重
    */
    unique: function (arr) {
        if (!Array.isArray(arr)) {
            return
        }
        arr = arr.sort()
        var arrAarray = []
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] != arr[index - 1]) {
                arrAarray.push(arr[index])
            }
        }
        var nodeFile = arrAarray
        fs.writeFileSync('messagea.js', JSON.stringify(nodeFile))
        var timeB = new Date().getTime()
    }

}