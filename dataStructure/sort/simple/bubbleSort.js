function swap(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

// 冒泡排序
// 相邻元素俩俩相比酌情交换，遍历完一遍后最后一个值是最大值，接下来遍历除最后一位的所有数字 俩俩比较
function bubbleSort(arr) {
  for (var i = 0, len = arr.length; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      // 第一个和第二个比(因为用j和j+1比较且索引从0开始，所以j最大值取 len-1-1 即< len -1 -i 或 j <= len - i )
      // 新第二个和第三个比
      // ...
      // 遍历一遍后，最后一个是最大值了
      // 除了最后一个元素，重复以上步骤
      if (arr[j] > arr[j + 1]) {
        swap(arr, arr[j], arr[j+1])
      }
    }
  }

  return arr
}

//举个数组
myArr = [20, 18, 27, 19, 35];
//使用函数
bubbleSort(myArr)