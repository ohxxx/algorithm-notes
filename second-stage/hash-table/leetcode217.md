## 217. 存在重复元素

**描述**

> 给定一个整数数组，判断是否存在重复元素。
> 如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。

**实例**

```
1、
  输入: [1,2,3,1]
  输出: true
2、
  输入: [1,2,3,4]
  输出: false
3、
  输入: [1,1,1,3,3,4,3,2,4,2]
  输出: true
```

**思路**

```
1、使用map
2、如果存在就直接return true，否则set
```

**实现**

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const temp = new Map();

  for (let i of nums) {
    if (temp.has(i)) {
      return true;
    } else {
      temp.set(i, 1);
    }
  }

  return false;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，有个 for of 循环，n 代表 nums 的长度  
`空间复杂度`：O(n)，使用了 map，n 代表 nums 的长度

**官方**

```js
var containsDuplicate = function (nums) {
  const set = new Set();
  for (const x of nums) {
    if (set.has(x)) {
      return true;
    }
    set.add(x);
  }
  return false;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(N)，其中 N 为数组的长度。  
`空间复杂度`：O(N)，其中 N 为数组的长度。
