## 104. 二叉树的最大深度

**描述**

> 给定一个二叉树，找出其最大深度。
> 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
> 说明: 叶子节点是指没有子节点的节点。

**实例**

```
1、
给定二叉树 [3,9,20,null,null,15,7]，
    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
```

**思路**

```
1、使用深度优先遍历，求最大深度
2、在dfs的过程中记录每个节点的层级
3、然后找出最大层级数
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
 * @return {number}
 */
var maxDepth = function (root) {
  let depth = 0;

  const dfs = (node, level) => {
    if (!node) return;
    if (!node.left && !node.right) {
      depth = Math.max(depth, level);
    }
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };

  dfs(root, 1);

  return depth;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表是二叉树的节点数  
`空间复杂度`：O(n)，使用了递归，所以算法中有个隐形的栈的数据结构，因为函数里面调用函数，会形成函数调用堆栈，最好情况是 log(n)，最坏情况是 n

**官方**

```js
/**
 * JavaScript 描述
 * DFS
 */
var maxDepth = function (root) {
  if (root == null) {
    return 0;
  }
  let leftHeight = maxDepth(root.left);
  let rightHeight = maxDepth(root.right);
  return Math.max(leftHeight, rightHeight) + 1;
};

// 精简版
var maxDepth = function (root) {
  return !root
    ? 0
    : Math.max(maxDepth(root.left) + 1, maxDepth(root.right) + 1);
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n), 我们每个结点只访问一次，因此时间复杂度为 O(N)  
`空间复杂度`：

- 最坏情况下，树是完全不平衡的，例如每个结点只剩下左子结点，递归将会被调用 N 次（树的高度），因此保持调用栈的存储将是 O(N)。
- 最好情况下（树是完全平衡的），树的高度将是 log(N)。因此，在这种情况下的空间复杂度将是 O(log(N))
