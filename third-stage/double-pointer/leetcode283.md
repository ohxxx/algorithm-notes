## 283. 移动零

**描述**

> 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

**实例**

```
1、
  输入: [0,1,0,3,12]
  输出: [1,3,12,0,0]
```

> 说明:
>
> - 必须在原数组上操作，不能拷贝额外的数组。
> - 尽量减少操作次数。

**思路**

```
1、创建双指针
2、left指针表示已经处理好的序列，而right指针表示还没有处理的序列
3、处理之后left指针以左的序列均是没有0的
```

**实现**

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  if (!nums) return;

  let left = 0;
  let right = 0;

  while (right < nums.length) {
    if (nums[right] !== 0) {
      nums[left++] = nums[right];
    }
    right++;
  }

  while (left < nums.length) {
    nums[left] = 0;
    left++;
  }
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表 nums 的长度，需要遍历两次数组，因此总时间复杂度为 O(2n) = O(n)。  
`空间复杂度`：O(1)。只使用了常数变量作为辅助空间，故渐进空间复杂度为 O(1)。

**官方**

```java
// java
class Solution {
  public void moveZeroes(int[] nums) {
    int n = nums.length, left = 0, right = 0;
    while (right < n) {
      if (nums[right] != 0) {
        swap(nums, left, right);
        left++;
      }
      right++;
    }
  }

  public void swap(int[] nums, int left, int right) {
    int temp = nums[left];
    nums[left] = nums[right];
    nums[right] = temp;
  }
}

```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 为序列长度。每个位置至多被遍历两次。  
`空间复杂度`：O(1)。只需要常数的空间存放若干变量。
