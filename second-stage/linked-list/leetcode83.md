## 83. 删除排序链表中的重复元素

**描述**

> 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。
> 返回同样按升序排列的结果链表。

**实例**

```
1、
  输入：head = [1,1,2]
  输出：[1,2]
2、
  输入：head = [1,1,2,3,3]
  输出：[1,2,3]
```

提示：

- 链表中节点数目在范围 [0, 300] 内
- -100 <= Node.val <= 100
- 题目数据保证链表已经按升序排列

**思路**

```
循环判断当前节点的值与下一节点的值是否相等
  a、相等 cur.next = cur.next.next  改变指向
  b、不相等 cur = cur.next
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
var deleteDuplicates = function (head) {
  if (!head) return null;

  let cur = head;
  while (cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }

  return head;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，有个 while 循环，n 代表链表长度  
`空间复杂度`：O(1)，只创建了 cur 链表作为辅助空间，所以渐进复杂度为 O(1)

**官方**

```js
var deleteDuplicates = function (head) {
  if (!head) {
    return head;
  }

  let cur = head;
  while (cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return head;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是链表的长度。  
`空间复杂度`：O(1)。
