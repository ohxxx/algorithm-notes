## 160. 相交链表

**描述**

> 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

图示两个链表在节点 c1 开始相交：

![image](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)

题目数据 保证 整个链式结构中不存在环。
注意，函数返回结果后，链表必须 保持其原始结构 。

**实例**

```
1、
  输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
  输出：Intersected at '8'
  解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
  从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
  在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

![image](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_1.png)

**思路**

```
1、使用双指针，共享链路
2、判断：
  a、当前节点相同时，返回当前节点
  b、不相同，继续走，当下个节点为null时替换链路
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let ha = headA;
  let hb = headB;

  while (ha !== hb) {
    ha = !ha ? headB : ha.next;
    hb = !hb ? headA : hb.next;
  }

  return ha;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，有个 while 循环，n 表示两个链表相交节点之前节点个数  
`空间复杂度`：O(1)，只定义了变量作为辅助空间，故渐进空间复杂度为 O(1)

**官方**

```js
var getIntersectionNode = function (headA, headB) {
  if (headA === null || headB === null) {
    return null;
  }
  let pA = headA,
    pB = headB;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(m+n)，其中 m 和 n 是分别是链表 headA 和 headB 的长度。两个指针同时遍历两个链表，每个指针遍历两个链表各一次。  
`空间复杂度`：O(1)
