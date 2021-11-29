## 75. 颜色分类

**描述**

> 给定一个包含红色、白色和蓝色，一共  n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
> 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

**实例**

```
1、
  输入：nums = [2,0,2,1,1,0]
  输出：[0,0,1,1,2,2]
2、
  输入：nums = [2,0,1]
  输出：[0,1,2]
3、
  输入：nums = [0]
  输出：[0]
4、
  输入：nums = [1]
  输出：[1]
```

> 提示：
>
> - n == nums.length
> - 1 <= n <= 300
> - nums[i] 为 0、1 或 2

**思路**

```
1、使用双指针中的左右指针，再加上循环的 i 其实就是三指针
2、依题意得
  [0, left]区间 - 代表红色 0
  [left, i]区间 - 代表白色 1
  [right, len - 1]区间 - 代表蓝色 2
```

**实现**

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let len = nums.length;
  let right = len - 1;
  let left = 0;
  const swap = (i, j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);

  /**
   * [0, left] = 0
   * [left, i] = 1
   * [right, len - 1] = 2
   */
  for (let i = 0; i <= right; i++) {
    if (nums[i] === 0) {
      swap(left, i);
      left++;
    }

    if (nums[i] === 2) {
      swap(right, i);
      right--;
      i--;
    }
  }
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表 nums 的长度  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```java
// java
class Solution {
  public void sortColors(int[] nums) {
    int n = nums.length;
    int p0 = 0, p1 = 0;
    for (int i = 0; i < n; ++i) {
      if (nums[i] == 1) {
        int temp = nums[i];
        nums[i] = nums[p1];
        nums[p1] = temp;
        ++p1;
      } else if (nums[i] == 0) {
        int temp = nums[i];
        nums[i] = nums[p0];
        nums[p0] = temp;
        if (p0 < p1) {
          temp = nums[i];
          nums[i] = nums[p1];
          nums[p1] = temp;
        }
        ++p0;
        ++p1;
      }
    }
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是数组 nums 的长度。  
`空间复杂度`：O(1)
