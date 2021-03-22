function swap(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

// 选择排序
// 第一个和所有的比 找到最小的放到新数组
// 循环一遍可以安顿好一个元素所以需要嵌套循环
function selectionSort(arr) {
  var min, len = arr.length;
  for (var i = 0; i < len - 1; ++i) {
    min = i;
    for (var j = i+1; j < len; ++j) {
      if (arr[j] < arr[min]) {
        // 找最小的
        min = j;
      }
    }
    // 把最小的放前面，保证前面是最小的
    swap(arr, i, min);
  }
  return arr
}

//举个数组
var myArr = [20, 18, 27, 19, 35];
// var myArr = [8, 94, 15, 88, 55, 76, 21, 39];
//使用函数
selectionSort(myArr)