## 21. 合并两个有序链表

**描述**

> 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

**实例**

> 实例 1
> ![image](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

```
1、
  输入：l1 = [1,2,4], l2 = [1,3,4]
  输出：[1,1,2,3,4,4]
2、
  输入：l1 = [], l2 = []
  输出：[]
3、
  输入：l1 = [], l2 = [0]
  输出：[0]
```

> 提示：
>
> - 两个链表的节点数目范围是 [0, 50]
> - -100 <= Node.val <= 100
> - l1 和 l2 均按 非递减顺序 排列

**思路**

```
1、判断当前节点的值的大小
2、进行解链递归判断
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n+m)，因为是递归，递归的次数取决于 l1 与 l2 链表长度，n 代表 l1 的链表长度，m 代表 l2 的链表长度  
`空间复杂度`：O(n+m)，n 代表 l1 的链表长度，m 代表 l2 的链表长度

**官方**

```js
// 递归解法
var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  } else if (l2 === null) {
    return l1;
  } else if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
// 迭代解法
var mergeTwoLists = function (l1, l2) {
  const prehead = new ListNode(-1);

  let prev = prehead;
  while (l1 != null && l2 != null) {
    if (l1.val <= l2.val) {
      prev.next = l1;
      l1 = l1.next;
    } else {
      prev.next = l2;
      l2 = l2.next;
    }
    prev = prev.next;
  }

  // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接将链表末尾指向未合并完的链表即可
  prev.next = l1 === null ? l2 : l1;

  return prehead.next;
};
```

**官方-复杂度分析**

> 递归

`时间复杂度`：O(n+m)，其中 n 和 m 分别为两个链表的长度。因为每次调用递归都会去掉 l1 或者 l2 的头节点（直到至少有一个链表为空），函数 mergeTwoList 至多只会递归调用每个节点一次。因此，时间复杂度取决于合并后的链表长度，即 O(n+m)。  
`空间复杂度`：O(n+m)，其中 n 和 m 分别为两个链表的长度。递归调用 mergeTwoLists 函数时需要消耗栈空间，栈空间的大小取决于递归调用的深度。结束递归调用时 mergeTwoLists 函数最多调用 n+m 次，因此空间复杂度为 O(n+m)。

> 迭代

`时间复杂度`：O(n+m)，其中 n 和 m 分别为两个链表的长度。因为每/次循环迭代中，l1 和 l2 只有一个元素会被放进合并链表中， 因此 while 循环的次数不会超过两个链表的长度之和。所有其他操作的时间复杂度都是常数级别的，因此总的时间复杂度为 O(n+m)。
`空间复杂度`：O(1)。我们只需要常数的空间存放若干变量。
