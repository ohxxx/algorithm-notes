## 19. 删除链表的倒数第 N 个结点

**描述**

> 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

**实例**

> ![image](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

```
1、
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
2、
输入：head = [1], n = 1
输出：[]
3、
输入：head = [1], n = 1
输出：[]

```

**思路**

```
1、使用快慢指针
2、先走快指针，拉开n的差距
3、等n到0，开始同时运行快慢指针
4、当快指针为null或者next指向null，即到达目的地
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let fast = (slow = head);

  // 拉开快慢指针差距
  while (n-- > 0) {
    fast = fast.next;
  }

  // 说明n是链表长度，即删除链头
  if (!fast) return head.next;

  // 同时开始运动
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;

  return head;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，有个 while 循环，最多循环整个链表的长度，即 n 代表链表长度，故渐进时间复杂度为 O(n)  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```java
// java
class Solution {
  public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    ListNode first = head;
    ListNode second = dummy;
    for (int i = 0; i < n; ++i) {
      first = first.next;
    }
    while (first != null) {
      first = first.next;
      second = second.next;
    }
    second.next = second.next.next;
    ListNode ans = dummy.next;
    return ans;
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(L)，其中 L 是链表的长度。  
`空间复杂度`：O(1)。
