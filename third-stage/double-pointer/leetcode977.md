## 977. 有序数组的平方

**描述**

> 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

**实例**

```
1、
  输入：nums = [-4,-1,0,3,10]
  输出：[0,1,9,16,100]
  解释：平方后，数组变为 [16,1,0,9,100]
  排序后，数组变为 [0,1,9,16,100]
2、
  输入：nums = [-7,-3,2,3,11]
  输出：[4,9,9,49,121]
```

> 提示：
>
> - 1 <= nums.length <= 104
> - -104 <= nums[i] <= 104
> - nums 已按 非递减顺序 排序

**思路**

```
1、使用左右双指针
2、先取左右指针绝对值，在进行比较
  将小的unshift到新数组中
```

**实现**

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  let ret = [];

  while (left <= right) {
    const absLeft = Math.abs(nums[left]);
    const absRight = Math.abs(nums[right]);

    if (absLeft > absRight) {
      ret.unshift(absLeft * absLeft);
      left++;
    } else {
      ret.unshift(absRight * absRight);
      right--;
    }
  }

  return ret;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表数组的长度，因为我们需要遍历完整的数组  
`空间复杂度`：O(1)，除了只使用了返回的答案数组 ret，剩余的辅助空间变量均为常数，故渐进空间复杂度为 O(1)

**官方**

```java
// java
class Solution {
  public int[] sortedSquares(int[] nums) {
    int n = nums.length;
    int negative = -1;
    for (int i = 0; i < n; ++i) {
      if (nums[i] < 0) {
        negative = i;
      } else {
        break;
      }
    }

    int[] ans = new int[n];
    int index = 0, i = negative, j = negative + 1;
    while (i >= 0 || j < n) {
      if (i < 0) {
        ans[index] = nums[j] * nums[j];
        ++j;
      } else if (j == n) {
        ans[index] = nums[i] * nums[i];
        --i;
      } else if (nums[i] * nums[i] < nums[j] * nums[j]) {
        ans[index] = nums[i] * nums[i];
        --i;
      } else {
        ans[index] = nums[j] * nums[j];
        ++j;
      }
      ++index;
    }

    return ans;
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是数组 nnums 的长度。  
`空间复杂度`：O(1)。除了存储答案的数组以外，我们只需要维护常量空间。
