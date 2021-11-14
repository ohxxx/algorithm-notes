## 704. 二分查找

**描述**

> 给定一个  n  个元素有序的（升序）整型数组  nums 和一个目标值  target  ，写一个函数搜索  nums  中的 target，如果目标值存在返回下标，否则返回 -1。

**实例**

```
1、
  输入: nums = [-1,0,3,5,9,12], target = 9
  输出: 4
  解释: 9 出现在 nums 中并且下标为 4
2、
  输入: nums = [-1,0,3,5,9,12], target = 2
  输出: -1
  解释: 2 不存在 nums 中因此返回 -1
```

> 提示：
>
> - 你可以假设 nums 中的所有元素是不重复的。
> - n 将在 [1, 10000]之间。
> - nums 的每个元素都将在 [-9999, 9999]之间。

**思路**

```
1、找出数组的中间值，进行比较
2、如果
  中间值 > 目标值 ： 答案在 [ left, ...mid - 1 ]
  中间值 < 目标值 ： 答案在 [ mid + 1, ...right ]
3、这样每次对半检索
```

**实现**

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;
    const num = nums[mid];
    if (num === target) return mid;
    if (num > target) right = mid - 1;
    if (num < target) left = mid + 1;
  }

  return -1;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(log(n))，因为二分查找每次检索都是缩小一半，所以二分查找的时间复杂度为 O(log(n))，n 代表数组的长度  
`空间复杂度`：O(1)，只使用了常数变量作为辅助空间，故渐进空间复杂度为 O(1)

**官方**

```js
var search = function (nums, target) {
  let low = 0,
    high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low;
    const num = nums[mid];
    if (num === target) {
      return mid;
    } else if (num > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(log(n))，其中 n 是数组的长度。  
`空间复杂度`：O(1)
