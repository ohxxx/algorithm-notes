## 剑指 Offer 03. 数组中重复的数字

**描述**

> 找出数组中重复的数字。
> 在一个长度为 n 的数组 nums 里的所有数字都在 0 ～ n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

**实例**

```
1、
  输入：[2, 3, 1, 0, 2, 5, 3]
  输出：2 或 3
```

**思路**

```
1、使用map
2、循环在map中添加元素，如果map中存在就返回当前值，否则继续
```

**实现**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  const temp = new Map();

  for (let i of nums) {
    if (temp.has(i)) return i;
    temp.set(i, 1);
  }
  return null;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，因为有个 for-of 循环，最坏的情况是遍历所有的 nums，即 n 代表 nums 的长度  
`空间复杂度`：O(n)，有个 map，最坏情况也是 nums 长度，故渐进空间复杂度为 O(n)

**官方**

```java
// java
class Solution {
  public int findRepeatNumber(int[] nums) {
    Set<Integer> set = new HashSet<Integer>();
    int repeat = -1;
    for (int num : nums) {
      if (!set.add(num)) {
          repeat = num;
          break;
      }
    }
    return repeat;
  }
}

```

**官方-复杂度分析**  
`时间复杂度`：O(n)。遍历数组一遍。使用哈希集合（HashSet），添加元素的时间复杂度为 O(1)，故总的时间复杂度是 O(n)。  
`空间复杂度`：O(n)。不重复的每个元素都可能存入集合，因此占用 O(n) 额外空间。
