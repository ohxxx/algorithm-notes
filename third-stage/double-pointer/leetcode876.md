## 876. 链表的中间结点

**描述**

> 给定一个头结点为 head 的非空单链表，返回链表的中间结点。
> 如果有两个中间结点，则返回第二个中间结点。

**实例**

```
1、
  输入：[1,2,3,4,5]
  输出：此列表中的结点 3 (序列化形式：[3,4,5])
  返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
  注意，我们返回了一个 ListNode 类型的对象 ans，这样：
  ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
2、
  输入：[1,2,3,4,5,6]
  输出：此列表中的结点 4 (序列化形式：[4,5,6])
  由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
```

> 提示：
>
> - 给定链表的结点数介于 1 和 100 之间。

**思路**

```
1、使用快慢指针
2、
  当右指针为null或右指针的next为null时
  左指针一定是中间节点
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
var middleNode = function (head) {
  let slow = (fast = head);

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表链表长度  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进时间复杂度为 O(1)

**官方**

```js
var middleNode = function (head) {
  slow = fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(N)，其中 N 是给定链表的结点数目。  
`空间复杂度`：O(1)，只需要常数空间存放 slow 和 fast 两个指针。
