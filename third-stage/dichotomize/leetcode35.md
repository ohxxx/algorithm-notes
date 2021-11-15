## 35. 搜索插入位置

**描述**

> 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

> 请必须使用时间复杂度为 O(log n) 的算法。

**实例**

```
1、
  输入: nums = [1,3,5,6], target = 5
  输出: 2
2、
  输入: nums = [1,3,5,6], target = 2
  输出: 1
3、
  输入: nums = [1,3,5,6], target = 7
  输出: 4
4、
  输入: nums = [1,3,5,6], target = 0
  输出: 0
5、
  输入: nums = [1], target = 0
  输出: 0
```

> 提示:
>
> - 1 <= nums.length <= 104
> - -104 <= nums[i] <= 104
> - nums 为无重复元素的升序排列数组
> - -104 <= target <= 104

**思路**

```
1、找出数组的中间值
2、进行比较
  如果相等 返回 当前值(中间值)
  如果小于目标值 取[mid + 1, ...right]
  如果小于目标值 取[left, ...mid - 1]
3、没有匹配到就返回left
```

**实现**

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(log(n))，因为二分查找每次检索都是缩小一半，所以二分查找的时间复杂度为 O(log(n))，n 代表 nums 数量  
`空间复杂度`：O(1)，只使用了常数变量作为辅助空间，故渐进空间复杂度为 O(1)

**官方**

```js
var searchInsert = function (nums, target) {
  const n = nums.length;
  let left = 0,
    right = n - 1,
    ans = n;
  while (left <= right) {
    let mid = ((right - left) >> 1) + left;
    if (target <= nums[mid]) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return ans;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(log(n))，其中 n 为数组的长度。二分查找所需的时间复杂度为 O(log(n))。  
`空间复杂度`：O(1)。我们只需要常数的空间保存若干变量。
