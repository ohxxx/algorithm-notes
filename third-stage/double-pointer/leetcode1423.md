## 1423. 可获得的最大点数

**描述**

> 几张卡牌 排成一行，每张卡牌都有一个对应的点数。点数由整数数组 cardPoints 给出。
> 每次行动，你可以从行的开头或者末尾拿一张卡牌，最终你必须正好拿 k 张卡牌。
> 你的点数就是你拿到手中的所有卡牌的点数之和。
> 给你一个整数数组 cardPoints 和整数 k，请你返回可以获得的最大点数。

**实例**

```
1、
  输入：cardPoints = [1,2,3,4,5,6,1], k = 3
  输出：12
  解释：第一次行动，不管拿哪张牌，你的点数总是 1 。但是，先拿最右边的卡牌将会最大化你的可获得点数。最优策略是拿右边的三张牌，最终点数为 1 + 6 + 5 = 12 。
2、
  输入：cardPoints = [2,2,2], k = 2
  输出：4
  解释：无论你拿起哪两张卡牌，可获得的点数总是 4 。
3、
  输入：cardPoints = [9,7,7,9,7,7,9], k = 7
  输出：55
  解释：你必须拿起所有卡牌，可以获得的点数为所有卡牌的点数之和。
4、
  输入：cardPoints = [1,1000,1], k = 1
  输出：1
  解释：你无法拿到中间那张卡牌，所以可以获得的最大点数为 1 。
5、
  输入：cardPoints = [1,79,80,1,1,1,200,1], k = 3
  输出：202
```

> 提示：
>
> - 1 <= cardPoints.length <= 10^5
> - 1 <= cardPoints[i] <= 10^4
> - 1 <= k <= cardPoints.length

**思路**

```
1、使用双指针-滑动窗口
2、当前窗口是指中间区域的窗口[left, right]
  a、先求出右窗口总和  [len - k, len]区间
  b、再求左窗口总和 [0, left]区间，left <= k
  c、每次移动左窗口就进行加头去尾
```

**实现**

```js
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
  let len = cardPoints.length;
  let left = 0;
  let right = len - k;
  let temp = 0;

  // 右窗口
  for (; right < len; right++) {
    temp += cardPoints[right];
  }

  let ret = temp;

  // 左窗口
  for (; left < k; left++) {
    temp += cardPoints[left];
    temp -= cardPoints[len - k + left];
    ret = Math.max(ret, temp);
  }

  return ret;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表数组长度  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```js
var maxScore = function (cardPoints, k) {
  const n = cardPoints.length;
  // 滑动窗口大小为 n-k
  const windowSize = n - k;
  // 选前 n-k 个作为初始值
  let sum = 0;
  for (let i = 0; i < windowSize; ++i) {
    sum += cardPoints[i];
  }
  let minSum = sum;
  for (let i = windowSize; i < n; ++i) {
    // 滑动窗口每向右移动一格，增加从右侧进入窗口的元素值，并减少从左侧离开窗口的元素值
    sum += cardPoints[i] - cardPoints[i - windowSize];
    minSum = Math.min(minSum, sum);
  }
  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    totalSum += cardPoints[i];
  }
  return totalSum - minSum;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是数组 cardPoints 的长度。  
`空间复杂度`：O(1)。
