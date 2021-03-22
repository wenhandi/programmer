function Promise(executor) {
    this.status = 'pending'
    this.value = null
    this.reason = null
    this.onFulfilledArray = []
    this.onRejectedArray = []

    const resolve = value => {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if (this.status === 'pending') {
                this.value = value
                this.status = 'fulfilled'

                this.onFulfilledArray.forEach(func => {
                    func(value)
                })
            }
        })
    }

    const reject = reason => {
        setTimeout(() => {
            if (this.status === 'pending') {
                this.reason = reason
                this.status = 'rejected'

                this.onRejectedArray.forEach(func => {
                    func(reason)
                })
            }
        })
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

const resolvePromise = (promise2, result, resolve, reject) => {
    // 当result和promise2相等时， 也就是onfulfilled返回promise2时，报错
    if (result === promise2) {
        reject(new TypeError('error due to circular reference'))
    }

    // 是否已执行过onfulflled或 onrejected
    let consumed = false
    let thenable

    if (result instanceof Promise) {
        if (result.status === 'pending') {
            result.then(function (data) {
                resolvePromise(promise2, data, resolve, reject)
            }, reject)
        } else {
            result.then(resolve, reject)
        }
        return
    }

    let isComplexResult = target => (typeof target === 'function' || typeof target === 'object') && (target !== null)

    if (isComplexResult(result)) {
        try {
            thenable = result.then
            if (typeof thenable === 'function') {
                thenable.call(result, function (data) {
                    if (consumed) {
                        return
                    }

                    consumed = true

                    return resolvePromise(promise2, data, resolve, reject)
                }, function (error) {
                    if (consumed) {
                        return
                    }

                    consumed = true

                    return reject(error)
                })
            } else {
                resolve(result)
            }
        } catch (e) {
            if (consumed) {
                return
            }

            consumed = true
            return reject(e)
        }
    } else {
        resolve(result)
    }

}

Promise.prototype.then = function (onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
    onrejected = typeof onrejected === 'function' ? onrejected : error => { throw error }

    let promise2

    if (this.status === 'fulfilled') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // 这个新的promise2的经过resolve处理后的值为onfulfiilled的执行结果
                    let result = onfulfilled(this.value)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    if (this.status === 'rejected') {
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let result = onrejected(this.reason)
                    resolvePromise(promise2, result, resolve, reject)
                }
                catch (e) {
                    reject(e)
                }
            })
        })
    }

    if (this.status === 'pending') {
        return promise2 = new Promise((resolve, reject) => {
            this.onFulfilledArray.push(value => {
                try {
                    let result = onfulfilled(value)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })

            this.onRejectedArray.push(reason => {
                try {
                    let result = onrejected(reason)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }


}