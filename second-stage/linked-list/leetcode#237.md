## 237. 删除链表中的节点

**描述**

> 请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点。传入函数的唯一参数为 要被删除的节点 。

现有一个链表 -- head = [4,5,1,9]，它可以表示为:
![`image`](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/01/19/237_example.png)

**实例**

```
1、
  输入：head = [4,5,1,9], node = 5
  输出：[4,1,9]
  解释：给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
2、
  输入：head = [4,5,1,9], node = 1
  输出：[4,5,9]
  解释：给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.

```

**思路**

```
1、被删除节点的值改为下一个节点的值
2、删除下一个节点
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
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(1)，因为没有任何循环
`空间复杂度`：O(1)，没有任何数组与矩阵

**官方**

```java
public void deleteNode(ListNode node) {
  node.val = node.next.val;
  node.next = node.next.next;
}

```

**官方-复杂度分析**  
`时间复杂度`：O(1)  
`空间复杂度`：O(1)
