## 100. 相同的树

**描述**

> 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
> 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

**实例**

> 实例 1
> ![image](https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg)

```
1、
  输入：p = [1,2,3], q = [1,2,3]
  输出：true
2、
  输入：p = [1,2], q = [1,null,2]
  输出：false
3、
  输入：p = [1,2,1], q = [1,1,2]
  输出：false
```

提示：

- 两棵树上的节点数目都在范围 [0, 100] 内
- -104 <= Node.val <= 104

**思路**

```
1、使用深度优先搜索
2、判断节点是否相等
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) {
    return false;
  } else {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，因为有递归，n 代表最小二叉树节点数  
`空间复杂度`：O(n)，n 代表最小二叉树的高度（最大为最高高度）

**官方**

```java
// java
class Solution {
  public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) {
      return true;
    } else if (p == null || q == null) {
      return false;
    } else if (p.val != q.val) {
      return false;
    } else {
      return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(min(m,n))，其中 m 和 n 分别是两个二叉树的节点数。对两个二叉树同时进行深度优先搜索，只有当两个二叉树中的对应节点都不为空时才会访问到该节点，因此被访问到的节点数不会超过较小的二叉树的节点数。  
`空间复杂度`：O(min(m,n))，其中 m 和 n 分别是两个二叉树的节点数。空间复杂度取决于递归调用的层数，递归调用的层数不会超过较小的二叉树的最大高度，最坏情况下，二叉树的高度等于节点数。
