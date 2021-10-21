## 203. 移除链表元素

**描述**

> 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

**实例**

```
1、
  输入：head = [1,2,6,3,4,5,6], val = 6
  输出：[1,2,3,4,5]
2、
  输入：head = [], val = 1
  输出：[]
3、
  输入：head = [7,7,7,7], val = 7
  输出：[]
```

提示：

- 列表中的节点数目在范围 [0, 104] 内
- 1 <= Node.val <= 50
- 0 <= val <= 50

**思路**

```
1、使用迭代
2、循环判断，删除符合条件的节点
3、用一个临时链表保存head，因为第一个节点也可能被删除
```

**实现**

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  const temp = new ListNode();
  temp.next = head;
  let prev = temp;

  while (prev.next) {
    if (prev.next.val === val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return temp.next;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，有个 while 循环，n 代表就是原链表的长度  
`空间复杂度`：O(1)，没有数组与矩阵，只用了 temp 链表变量作为辅助空间，所以渐进空间复杂度为 O(1)

**官方**

```js
var removeElements = function (head, val) {
  if (head === null) {
    return head;
  }
  head.next = removeElements(head.next, val);
  return head.val === val ? head.next : head;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是链表的长度。递归过程中需要遍历链表一次。  
`空间复杂度`：O(n)，其中 n 是链表的长度。空间复杂度主要取决于递归调用栈，最多不会超过 n 层。
