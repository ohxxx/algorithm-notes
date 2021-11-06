## 102. 二叉树的层序遍历

**描述**

> 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

**实例**

```
1、
  二叉树：[3,9,20,null,null,15,7],
     3
    / \
   9  20
      /  \
    15    7
  返回其层序遍历结果：
    [
      [3],
      [9,20],
      [15,7]
    ]
```

**思路**

```
1、使用广度优先遍历进行层序遍历
2、在遍历的过程中记录当前的节点和层级到数组中
```

**实现**

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];

  const queue = [root];
  const res = [];

  while (queue.length) {
    let len = queue.length;
    res.push([]);
    while (len--) {
      const node = queue.shift();
      res[res.length - 1].push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return res;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，因为使用了广度优先遍历，我们要遍历每个节点，n 就代表节点的个数  
`空间复杂度`：O(n)，应为有个线性增长的 queue 数组，取决于二叉树的个数，所以 n 也代表二叉树的节点数

**官方**

```js
var levelOrder = function (root) {
  const ret = [];
  if (!root) {
    return ret;
  }

  const q = [];
  q.push(root);
  while (q.length !== 0) {
    const currentLevelSize = q.length;
    ret.push([]);
    for (let i = 1; i <= currentLevelSize; ++i) {
      const node = q.shift();
      ret[ret.length - 1].push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
  }

  return ret;
};
```

**官方-复杂度分析**  
`时间复杂度`：每个点进队出队各一次，故渐进时间复杂度为 O(n)。  
`空间复杂度`：队列中元素的个数不超过 n 个，故渐进空间复杂度为 O(n)。
