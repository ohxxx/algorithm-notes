## 148. 排序链表

**描述**

> 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

> 进阶：
> 你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

**实例**

> 实例 1
> ![image](https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg)

```
1、
  输入：head = [4,2,1,3]
  输出：[1,2,3,4]
2、
  输入：head = [-1,5,3,4,0]
  输出：[-1,0,3,4,5]
3、
  输入：head = [-1,5,3,4,0]
  输出：[-1,0,3,4,5]
```

**思路**

```
1、使用快慢指针终点，断链
2、使用归并排序，合并
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
var sortList = function (head) {
  if (!head || !head.next) return head;

  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  let mid = slow.next;
  slow.next = null;

  return merge(sortList(head), sortList(mid));
};

const merge = (left, right) => {
  let newHead = new ListNode(0);
  let res = newHead;
  while (left && right) {
    if (left.val < right.val) {
      newHead.next = left;
      left = left.next;
    } else {
      newHead.next = right;
      right = right.next;
    }
    newHead = newHead.next;
  }
  newHead.next = left ?? right;

  return res.next;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(nlog(n))， 使用了归并排序，n 代表链表的长度。  
`空间复杂度`：O(log(n))，n 代表链表的长度。空间复杂度主要取决于递归调用的栈空间。

**官方**

```js
const merge = (head1, head2) => {
  const dummyHead = new ListNode(0);
  let temp = dummyHead,
    temp1 = head1,
    temp2 = head2;
  while (temp1 !== null && temp2 !== null) {
    if (temp1.val <= temp2.val) {
      temp.next = temp1;
      temp1 = temp1.next;
    } else {
      temp.next = temp2;
      temp2 = temp2.next;
    }
    temp = temp.next;
  }
  if (temp1 !== null) {
    temp.next = temp1;
  } else if (temp2 !== null) {
    temp.next = temp2;
  }
  return dummyHead.next;
};

var sortList = function (head) {
  if (head === null) {
    return head;
  }
  let length = 0;
  let node = head;
  while (node !== null) {
    length++;
    node = node.next;
  }
  const dummyHead = new ListNode(0, head);
  for (let subLength = 1; subLength < length; subLength <<= 1) {
    let prev = dummyHead,
      curr = dummyHead.next;
    while (curr !== null) {
      let head1 = curr;
      for (let i = 1; i < subLength && curr.next !== null; i++) {
        curr = curr.next;
      }
      let head2 = curr.next;
      curr.next = null;
      curr = head2;
      for (
        let i = 1;
        i < subLength && curr != null && curr.next !== null;
        i++
      ) {
        curr = curr.next;
      }
      let next = null;
      if (curr !== null) {
        next = curr.next;
        curr.next = null;
      }
      const merged = merge(head1, head2);
      prev.next = merged;
      while (prev.next !== null) {
        prev = prev.next;
      }
      curr = next;
    }
  }
  return dummyHead.next;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(nlog(n))，其中 n 是链表的长度。  
`空间复杂度`：O(1)。
