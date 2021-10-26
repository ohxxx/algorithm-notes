## 141. 环形链表

**描述**

> 给定一个链表，判断链表中是否有环。

> 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

> 如果链表中存在环，则返回 true 。 否则，返回 false 。

进阶：你能用 O(1)（即，常量）内存解决此问题吗？

**实例**

> 实例 1
> ![image](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

```
1、
  输入：head = [3,2,0,-4], pos = 1
  输出：true
  解释：链表中有一个环，其尾部连接到第二个节点。
2、
  输入：head = [1,2], pos = 0
  输出：true
  解释：链表中有一个环，其尾部连接到第一个节点。
3、
  输入：head = [1], pos = -1
  输出：false
  解释：链表中没有环。
```

**思路**

```
1、使用map
2、如果map中存在当前head，说明有环，否则没有
```

**实现**

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  const temp = new Map();

  while (head) {
    if (temp.has(head)) {
      return true;
    } else {
      temp.set(head, 1);
      head = head.next;
    }
  }
  return false;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，有个 while 循环，n 代表链表的长度  
`空间复杂度`：O(n)，n 代表 map 的长度，即链表长度

**官方**

```java
// java
public class Solution {
  public boolean hasCycle(ListNode head) {
    Set<ListNode> seen = new HashSet<ListNode>();
    while (head != null) {
      if (!seen.add(head)) {
        return true;
      }
      head = head.next;
    }
    return false;
  }
}

```

**官方-复杂度分析**  
`时间复杂度`：O(N)，其中 N 是链表中的节点数。最坏情况下我们需要遍历每个节点一次。  
`空间复杂度`：O(N)，其中 N 是链表中的节点数。主要为哈希表的开销，最坏情况下我们需要将每个节点插入到哈希表中一次。
