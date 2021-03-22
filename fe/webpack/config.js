// 代码分离

// 动态代码拆分
import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    return _.join(['hello', 'webpack'], '')
})


module.exports = {
    entry: {
        index: './src/index.js'
    },

    output: {
        filename: '[name].bundle.js',
        // 决定非入口chunk的名称
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}