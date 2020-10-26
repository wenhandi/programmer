import axios from 'axios'		//引入axios


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // http响应码
    // response.status
    return response && response.data;
}, function (error) {
    console.log(error)
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 * axios 方法封装
 * @param {*} method 
 * @param {*} url 
 * @param {*} data 
 */
function _net(method, url, data = {}) {
    return new Promise((resolve, reject) => {
        axios[method](url, data).then(res => {
            // 接口成功
            if (res && res.boyList && res.girlList) {
                resolve(res)
            } else {
                reject('接口异常')
                console.error('接口异常')
            }
        }).catch(err => {
            // alert('接口异常')
            console.error(err)
        });

    })
}
/**
 * axios 方法封装
 * @param {String} url 
 * @param {Object} data
 * @param {Object} self
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        _net('post', url, data).then((res) => {
            resolve(res)
        }, err => {
            reject(err)
        })
    })
}
/**
 * axios get方法封装
 * @param {*} url 
 * @param {*} data 
 */
export function get(url, data = {}) {
    return new Promise(resolve => {
        _net('get', url, data, self).then((res) => {
            resolve(res)
        })
    })
}

export default post