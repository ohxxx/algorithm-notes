## 746. 使用最小花费爬楼梯

**描述**

> 给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。
> 你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
> 请你计算并返回达到楼梯顶部的最低花费。

**实例**

```
1、
  输入：cost = [10,15,20]
  输出：15
  解释：你将从下标为 1 的台阶开始。
  - 支付 15 ，向上爬两个台阶，到达楼梯顶部。
  总花费为 15 。
2、
  输入：cost = [1,100,1,1,1,100,1,1,100,1]
  输出：6
  解释：你将从下标为 0 的台阶开始。
  - 支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。
  - 支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。
  - 支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。
  - 支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。
  - 支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。
  - 支付 1 ，向上爬一个台阶，到达楼梯顶部。
  总花费为 6 。
```

> 提示：
>
> - 2 <= cost.length <= 1000
> - 0 <= cost[i] <= 999

**思路**

```
1、动态规划
2、dp下标的定义：dp[i]表示走到当前阶梯所需要消耗的最小花费
3、递推公式：dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
4、dp数组初始化：可以从0或者1开始，所以dp = [0, 0]
5、遍历顺序：从前向后
```

**实现**

```js
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const len = cost.length;
  const dp = [0, 0];

  for (let i = 2; i <= len; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[len];
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表 len，会循环 len 次
`空间复杂度`：O(n)，n 代表 dp 数组存放的长度

**官方**

```js
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  let prev = 0,
    curr = 0;
  for (let i = 2; i <= n; i++) {
    let next = Math.min(curr + cost[i - 1], prev + cost[i - 2]);
    prev = curr;
    curr = next;
  }
  return curr;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是数组 cost 的长度。需要依次计算每个 dp 值，每个值的计算需要常数时间，因此总时间复杂度是 O(n)。  
`空间复杂度`：O(1)。使用滚动数组的思想，只需要使用有限的额外空间。
