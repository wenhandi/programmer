// 遍历

// 对象描述符 Descriptor
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

// 忽略enumerable为false的属性的4个操作
// 继承属性
// for...in循环：       只遍历对象自身的和继承的可枚举的属性。

// 自身属性
// Object.keys()：      返回对象自身的所有可枚举的属性的键名。
// JSON.stringify()：   只串行化对象自身的可枚举的属性。
// Object.assign()：    只拷贝对象自身的可枚举的属性。


// 对象遍历
// for in
// Object.keys()
// Object.entries()

// 数组
// forEach
// forEach


// 迭代器
// 新语法   for of