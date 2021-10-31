## 94. 二叉树的中序遍历

**描述**

> 给定一个二叉树的根节点 root ，返回它的 中序 遍历。

**实例**

> 实例 1
> ![image](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

```
1、
  输入：root = [1,null,2,3]
输出：[1,3,2]
2、
  输入：root = []
  输出：[]
3、
  输入：root = [1]
  输出：[1]
4、
  输入：root = [1,2]
  输出：[2,1]
5、
  输入：root = [1,null,2]
  输出：[1,2]
```

**思路**

```
1、使用递归完成树的中序遍历
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const ret = [];
  const inOrderTraverse = (node) => {
    if (!node) return;

    inOrderTraverse(node.left);
    ret.push(node.val);
    inOrderTraverse(node.right);
  };
  inOrderTraverse(root);
  return ret;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，使用了递归，n 代表二叉树的节点长度  
`空间复杂度`：O(n)，n 代表递归的栈的深度

**官方**

```js
var inorderTraversal = function (root) {
  const res = [];
  const stk = [];
  while (root || stk.length) {
    while (root) {
      stk.push(root);
      root = root.left;
    }
    root = stk.pop();
    res.push(root.val);
    root = root.right;
  }
  return res;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 nn 为二叉树节点的个数。二叉树的遍历中每个节点会被访问一次且只会被访问一次。  
`空间复杂度`：O(n)。空间复杂度取决于栈深度，而栈深度在二叉树为一条链的情况下会达到 O(n) 的级别。
