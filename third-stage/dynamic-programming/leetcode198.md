## 198. 打家劫舍

**描述**

> 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

> 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

**实例**

```
1、
  输入：[1,2,3,1]
  输出：4
  解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
      偷窃到的最高金额 = 1 + 3 = 4 。
2、
  输入：[2,7,9,3,1]
  输出：12
  解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
       偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

> 提示：
>
> - 1 <= nums.length <= 100
> - 0 <= nums[i] <= 400

**思路**

```
1、动态规划
2、dp下标的定义：dp[i]表示最多可以偷窃的金额
3、递推公式：dp[i] = Math.max(dp[i - 2] + num[i], dp[i - 1])
4、dp数组初始化：dp[0]就是num[0]，dp[1]就是num[0]与num[1]取最大值
5、遍历顺序：从前到后
```

**实现**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const len = nums.length;

  if (len === 0) return 0;
  if (len === 1) return nums[0];
  if (len === 2) return Math.max(nums[0], nums[1]);

  const dp = [nums[0], Math.max(nums[0], nums[1])];
  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  return dp[len - 1];
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表 len（数组长度），会循环 len 次
`空间复杂度`：O(n)，n 代表 dp 数组存放的长度

**官方**

```java
class Solution {
  public int rob(int[] nums) {
    if (nums == null || nums.length == 0) {
      return 0;
    }
    int length = nums.length;
    if (length == 1) {
      return nums[0];
    }
    int first = nums[0], second = Math.max(nums[0], nums[1]);
    for (int i = 2; i < length; i++) {
      int temp = second;
      second = Math.max(first + nums[i], second);
      first = temp;
    }
    return second;
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是数组长度。只需要对数组遍历一次。  
`空间复杂度`：O(1)。使用滚动数组，可以只存储前两间房屋的最高总金额，而不需要存储整个数组的结果，因此空间复杂度是 O(1)。
