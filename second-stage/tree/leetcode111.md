## 111. 二叉树的最小深度

**描述**

> 给定一个二叉树，找出其最小深度。
> 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。

**实例**
![image](https://assets.leetcode.com/uploads/2020/10/12/ex_depth.jpg)

```
1、
  输入：root = [3,9,20,null,null,15,7]
  输出：2

2、
  输入：root = [2,null,3,null,4,null,5,null,6]
  输出：5
```

**思路**

```
1、使用广度优先遍历
2、遇到叶子节点、停止遍历、返回节点层级
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
var minDepth = function (root) {
  if (!root) return 0;

  const queue = [[root, 1]];
  while (queue.length) {
    const [node, level] = queue.shift();
    if (!node.left && !node.right) return level;
    if (node.left) queue.push([node.left, level + 1]);
    if (node.right) queue.push([node.right, level + 1]);
  }
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，因为有个 while 循环，n 代表树的节点数量  
`空间复杂度`：O(n)，因为有个队列 queue，n 代表树的节点数量

**官方**

```java
// java
class Solution {
  class QueueNode {
    TreeNode node;
    int depth;

    public QueueNode(TreeNode node, int depth) {
      this.node = node;
      this.depth = depth;
    }
  }

  public int minDepth(TreeNode root) {
    if (root == null) {
      return 0;
    }

    Queue<QueueNode> queue = new LinkedList<QueueNode>();
    queue.offer(new QueueNode(root, 1));
    while (!queue.isEmpty()) {
      QueueNode nodeDepth = queue.poll();
      TreeNode node = nodeDepth.node;
      int depth = nodeDepth.depth;
      if (node.left == null && node.right == null) {
        return depth;
      }
      if (node.left != null) {
        queue.offer(new QueueNode(node.left, depth + 1));
      }
      if (node.right != null) {
        queue.offer(new QueueNode(node.right, depth + 1));
      }
    }

    return 0;
  }
}

```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是树的节点数。对每个节点访问一次。  
`空间复杂度`：O(n)，其中 n 是树的节点数。空间复杂度主要取决于队列的开销，队列中的元素个数不会超过树的节点数。
