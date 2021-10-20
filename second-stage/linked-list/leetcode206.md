## 206. 反转链表

**描述**

> 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

**实例**

实例![image](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

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
1、使用迭代
2、暂存当前节点和下一个节点
3、改变指向
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
  let prev = null;
  let cur = head;

  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，有个 while 循环，n 代表链表长度  
`空间复杂度`：O(1)，只用了变量作为辅助空间，故渐进空间复杂度为 O(1)

**官方**

```js
var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是链表的长度。需要遍历链表一次。  
`空间复杂度`：O(1)。
