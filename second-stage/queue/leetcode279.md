## 279. 完全平方数

**描述**

> 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。

> 给你一个整数 n ，返回和为 n 的完全平方数的 最少数量 。

> 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。

**实例**

```
1、
  输入：n = 12
  输出：3
  解释：12 = 4 + 4 + 4
2、
  输入：n = 13
  输出：2
  解释：13 = 4 + 9
```

> 提示：
>
> - 1 <= n <= 104

**思路**

```
1、将它想象成一个二叉树，然后进行BFS
2、创建存储队列，与辅助队列（访问过）
3、循环判断
```

**实现**

```js
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  const queue = [];
  // 记录访问过的节点值
  const visited = new Set();
  queue.push(0);
  visited.add(0);
  // 树的第几层
  let level = 0;

  while (queue.length) {
    level++;
    // 每一层的节点数量
    const len = queue.length;
    // 遍历当前所有节点
    for (let i = 0; i < len; i++) {
      // 节点的值
      const cur = queue.shift();
      // 访问当前节点的子节点，类比于二叉树的左右子节点
      for (let j = 1; j <= n; j++) {
        // 子节点的值
        let node = cur + j * j;
        // node始终是完全平方数的和，相当于n的时候直接返回
        if (node === n) return level;
        // 如果大于n，终止内层循环
        if (node > n) break;
        if (!visited.has(node)) {
          queue.push(node);
          visited.add(node);
        }
      }
    }
  }

  return level;
};
```

**实现-复杂度分析**  
`时间复杂度`：-  
`空间复杂度`：-

**官方**

```js
// 动态规划
var numSquares = function (n) {
  const f = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    let minn = Number.MAX_VALUE;
    for (let j = 1; j * j <= i; j++) {
      minn = Math.min(minn, f[i - j * j]);
    }
    f[i] = minn + 1;
  }
  return f[n];
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n$\sqrt{n}$)，其中 nn 为给定的正整数。状态转移方程的时间复杂度为 O($\sqrt{n}$)，共需要计算 n 个状态，因此总时间复杂度为 O(n$\sqrt{n}$)。
`空间复杂度`：O(n)。我们需要 O(n) 的空间保存状态。
