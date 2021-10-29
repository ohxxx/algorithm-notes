## 101. 对称二叉树

**描述**

> 给定一个二叉树，检查它是否是镜像对称的。

**实例**

```
1、
  例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
       1
      / \
      2   2
    / \ / \
    3  4 4  3
2、
  但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
       1
      / \
      2   2
      \   \
      3    3
```

**思路**

```
1、使用递归
2、判断左右节点是否相同
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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  return judgeFn(root, root);
};

const judgeFn = (leftNode, rightNode) => {
  if (!leftNode && !rightNode) return true;
  if (!leftNode || !rightNode) return false;
  return (
    leftNode.val === rightNode.val &&
    judgeFn(leftNode.left, rightNode.right) &&
    judgeFn(leftNode.right, rightNode.left)
  );
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，因为要遍历整棵树，使用 n 代表树的高度，所以渐进时间复杂度为 O(n)  
`空间复杂度`：O(n)，虽然没有声明变量，但不停递归调用 judgeFn，所以 n 代表树的高度，所以渐进空间复杂度为 O(n)

**官方**

```ts
const check = (p: TreeNode | null, q: TreeNode | null): boolean => {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
};
var isSymmetric = function (root: TreeNode | null): boolean {
  return check(root, root);
};
```

**官方-复杂度分析**  
`时间复杂度`：这里遍历了这棵树，渐进时间复杂度为 O(n)。  
`空间复杂度`：这里的空间复杂度和递归使用的栈空间有关，这里递归层数不超过 n，故渐进空间复杂度为 O(n)。
