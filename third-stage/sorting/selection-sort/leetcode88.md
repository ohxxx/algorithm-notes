## 88. 合并两个有序数组

**描述**

> 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

> 请你 `合并` nums2 到 nums1 中，使合并后的数组同样按 `非递减顺序` 排列。

> `注意：`最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

**实例**

```
1、
  输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
  输出：[1,2,2,3,5,6]
  解释：需要合并 [1,2,3] 和 [2,5,6] 。
  合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
2、
  输入：nums1 = [1], m = 1, nums2 = [], n = 0
  输出：[1]
  解释：需要合并 [1] 和 [] 。
  合并结果是 [1] 。
3、
  输入：nums1 = [0], m = 0, nums2 = [1], n = 1
  输出：[1]
  解释：需要合并的数组是 [] 和 [1] 。
  合并结果是 [1] 。
  注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
```

> 提示：
>
> - nums1.length == m + n
> - nums2.length == n
> - 0 <= m, n <= 200
> - 1 <= m + n <= 200
> - -109 <= nums1[i], nums2[j] <= 109

**思路**

```
1、先将nums2添加进nums1中
2、使用快速排序
```

**实现**

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  if (nums2.length > 0) {
    nums1.splice(m, nums1.length - m, ...nums2);
  } else {
    return;
  }
  const { length } = nums1;
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    for (let j = i; j < length; j++) {
      if (nums1[indexMin] > nums1[j]) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      [nums1[i], nums1[indexMin]] = [nums1[indexMin], nums1[i]];
    }
  }
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n^2)，因为有两个嵌套的循环，导致二次方的复杂度  
`空间复杂度`：O(n)，n 代表(m + n)，也就是 nums1 与 nums2 合并后的 nums1 的长度

**官方**

![gif](https://assets.leetcode-cn.com/solution-static/88/1.gif)

```js
// 双指针
var merge = function (nums1, m, nums2, n) {
  let p1 = 0,
    p2 = 0;
  const sorted = new Array(m + n).fill(0);
  var cur;
  while (p1 < m || p2 < n) {
    if (p1 === m) {
      cur = nums2[p2++];
    } else if (p2 === n) {
      cur = nums1[p1++];
    } else if (nums1[p1] < nums2[p2]) {
      cur = nums1[p1++];
    } else {
      cur = nums2[p2++];
    }
    sorted[p1 + p2 - 1] = cur;
  }
  for (let i = 0; i != m + n; ++i) {
    nums1[i] = sorted[i];
  }
};
```

**官方-复杂度分析**  
`时间复杂度`：O(m+n)，指针移动单调递增，最多移动 m+n 次，因此时间复杂度为 O(m+n))。  
`空间复杂度`：O(m+n)，需要建立长度为 m+n 的中间数组 sorted。
