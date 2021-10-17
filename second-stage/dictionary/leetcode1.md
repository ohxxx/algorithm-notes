## 1. 两数之和

**描述**

> 给定一个整数数组 nums  和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那   两个   整数，并返回它们的数组下标。
> 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
> 你可以按任意顺序返回答案。

**实例**

```
1、
  输入：nums = [2,7,11,15], target = 9
  输出：[0,1]
  解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
2、
  输入：nums = [3,2,4], target = 6
  输出：[1,2]
3、
  输入：nums = [3,3], target = 6
  输出：[0,1]
```

**思路**

```
1、使用字典
2、遍历字典、进行匹配
```

**实现**

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    const n2 = target - n;

    if (map.has(n2)) {
      return [map.get(n2), i];
    } else {
      map.set(n, i);
    }
  }
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，因为有个 for 循环  
`空间复杂度`：O(n)，创建了一个 map，是有个线性增长的一个空间复杂度

**官方**

```java
class Solution {
  public int[] twoSum(int[] nums, int target) {
    int n = nums.length;
    for (int i = 0; i < n; ++i) {
      for (int j = i + 1; j < n; ++j) {
        if (nums[i] + nums[j] == target) {
          return new int[]{i, j};
        }
      }
    }
    return new int[0];
  }
}

```

**官方-复杂度分析**  
`时间复杂度`：O(n^2)，其中 n 是数组中的元素数量。最坏情况下数组中任意两个数都要被匹配一次。  
`空间复杂度`：O(1)。
