## 234. 回文链表

**描述**

> 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

**实例**

```
1、
  输入：head = [1,2,2,1]
  输出：true
2、
  输入：head = [1,2]
  输出：false
```

**思路**

```
1、将链表转为数组
2、循环头尾比对
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
 * @return {boolean}
 */
var isPalindrome = function (head) {
  const temp = [];

  while (head) {
    temp.push(head.val);
    head = head.next;
  }

  let len = temp.length - 1;
  for (let i = 0; i < temp.length; i++) {
    if (temp[i] !== temp[len]) return false;
    len--;
  }
  return true;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，有 while 与 for 循环，相对而言 while 的循环比 for 用时长，即 n 代表链表长度  
`空间复杂度`：O(n)，定义了一个 temp 数组，n 即链表长度

**官方**

```js
const reverseList = (head) => {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
};

const endOfFirstHalf = (head) => {
  let fast = head;
  let slow = head;
  while (fast.next !== null && fast.next.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};

var isPalindrome = function (head) {
  if (head == null) return true;

  // 找到前半部分链表的尾节点并反转后半部分链表
  const firstHalfEnd = endOfFirstHalf(head);
  const secondHalfStart = reverseList(firstHalfEnd.next);

  // 判断是否回文
  let p1 = head;
  let p2 = secondHalfStart;
  let result = true;
  while (result && p2 != null) {
    if (p1.val != p2.val) result = false;
    p1 = p1.next;
    p2 = p2.next;
  }

  // 还原链表并返回结果
  firstHalfEnd.next = reverseList(secondHalfStart);
  return result;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 指的是链表的大小。  
`空间复杂度`：O(1)。我们只会修改原本链表中节点的指向，而在堆栈上的堆栈帧不超过 O(1)。
