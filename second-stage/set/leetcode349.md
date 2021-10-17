## 349. 两个数组的交集

**描述**

> 给定两个数组，编写一个函数来计算它们的交集。

**实例**

```
1、
  输入：nums1 = [1,2,2,1], nums2 = [2,2]
  输出：[2]
2、
  输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
  输出：[9,4]
```

**思路**

```
1、用集合去重
2、遍历、筛选
```

**实现**

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  // return [...new Set(nums1)].filter((e) => new Set(nums2).has(e))
  return [...new Set(nums1)].filter((e) => nums2.includes(e));
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n \* m) = O(n^2)，因为有 filter 和 include 循环
`空间复杂度`：O(n)，n 代表 new Set 去重后的数组的长度

**官方**

```js
const set_intersection = (set1, set2) => {
  if (set1.size > set2.size) {
    return set_intersection(set2, set1);
  }
  const intersection = new Set();
  for (const num of set1) {
    if (set2.has(num)) {
      intersection.add(num);
    }
  }
  return [...intersection];
};

var intersection = function (nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  return set_intersection(set1, set2);
};
```

**官方-复杂度分析**  
`时间复杂度`：O(m+n)，其中 m 和 n 分别是两个数组的长度。使用两个集合分别存储两个数组中的元素需要 O(m+n) 的时间，遍历较小的集合并判断元素是否在另一个集合中需要 O(min(m,n)) 的时间，因此总时间复杂度是 O(m+n)。  
`空间复杂度`：O(m+n)，其中 m 和 n 分别是两个数组的长度。空间复杂度主要取决于两个集合。
