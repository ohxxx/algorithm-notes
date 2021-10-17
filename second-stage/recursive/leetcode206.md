## 206. 反转链表

**描述**

> 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

**实例**

```
1、
  输入：head = [1,2,3,4,5]
  输出：[5,4,3,2,1]
2、
  输入：head = [1,2]
  输出：[2,1]
3、
  输入：head = []
  输出：[]
```

**思路**

```
1、使用递归
2、改变next指针指向
3、第一个节点的next要指向null
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
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head || !head.next) return head;

  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表链表长度，因为要反转  
`空间复杂度`：O(n)，n 也代表链表长度，因为创建 newHead

**官方**

```js
var reverseList = function (head) {
  if (head == null || head.next == null) {
    return head;
  }
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是链表的长度。需要对链表的每个节点进行反转操作。  
`空间复杂度`：O(n)，其中 n 是链表的长度。空间复杂度主要取决于递归调用的栈空间，最多为 n 层。
