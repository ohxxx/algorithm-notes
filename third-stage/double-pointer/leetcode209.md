## 209. 长度最小的子数组

**描述**

> 给定一个含有  n  个正整数的数组和一个正整数 target 。
> 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组  [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

**实例**

```
1、
  输入：target = 7, nums = [2,3,1,2,4,3]
  输出：2
  解释：子数组 [4,3] 是该条件下的长度最小的子数组。
2、
  输入：target = 4, nums = [1,4,4]
  输出：1
3、
  输入：target = 11, nums = [1,1,1,1,1,1,1,1]
  输出：0
```

> 提示：
>
> - 1 <= target <= 109
> - 1 <= nums.length <= 105
> - 1 <= nums[i] <= 105

> 进阶：
>
> - 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。

**思路**

```
1、使用双指针-滑动窗口
2、先移动右指针
  a、叠加当前下标值，求当前总和
  b、如果当前数总和大于等于目标值，开始移动左指针
  c、如果小于就移动右指针
```

**实现**

```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let len = nums.length;
  let left = (right = 0);
  let ret = Number.MAX_VALUE;
  let count = 0;

  while (right < len) {
    count += nums[right];

    while (count >= target) {
      ret = Math.min(ret, right - left + 1);
      count -= nums[left];
      left++;
    }
    right++;
  }

  return ret === Number.MAX_VALUE ? 0 : ret;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表数组 nums 的长度  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```java
// java
class Solution {
  public int minSubArrayLen(int s, int[] nums) {
    int n = nums.length;
    if (n == 0) {
      return 0;
    }
    int ans = Integer.MAX_VALUE;
    int start = 0, end = 0;
    int sum = 0;
    while (end < n) {
      sum += nums[end];
      while (sum >= s) {
        ans = Math.min(ans, end - start + 1);
        sum -= nums[start];
        start++;
      }
      end++;
    }
    return ans == Integer.MAX_VALUE ? 0 : ans;
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是数组的长度。指针 start 和 end 最多各移动 n 次。  
`空间复杂度`：O(1)。
