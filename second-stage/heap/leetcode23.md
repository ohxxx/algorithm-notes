## 23. 合并 K 个升序链表

**描述**

> 给你一个链表数组，每个链表都已经按升序排列。
> 请你将所有链表合并到一个升序链表中，返回合并后的链表。

**实例**

```
1、
  输入：lists = [[1,4,5],[1,3,4],[2,6]]
  输出：[1,1,2,3,4,4,5,6]
  解释：链表数组如下：
  [
    1->4->5,
    1->3->4,
    2->6
  ]
  将它们合并到一个有序链表中得到。
  1->1->2->3->4->4->5->6
2、
  输入：lists = []
  输出：[]
3、
  输入：lists = [[]]
  输出：[]
```

**思路**

```
1、使用最小堆，并将链表头插入
2、弹出堆顶到链表，并将新链表头插入到堆中
```

**实现**

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i) {
    return (i - 1) >> 1;
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  shiftUp(index) {
    if (index == 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (
      this.heap[parentIndex] &&
      this.heap[parentIndex].val > this.heap[index].val
    ) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] &&
      this.heap[leftIndex].val < this.heap[index].val
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].val < this.heap[index].val
    ) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  pop() {
    if (this.size() === 1) return this.heap.shift();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);

    return top;
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const ret = new ListNode(0);
  let p = ret;
  const heap = new MinHeap();
  lists.forEach((e) => {
    if (e) heap.insert(e);
  });

  while (heap.size()) {
    const node = heap.pop();
    p.next = node;
    p = p.next;
    if (node.next) heap.insert(node.next);
  }

  return ret.next;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(nlogk)，因为有 while 循环，时间复杂度为 n，n 代表所有链表的节点个数之和，while 循环中还有 pop 与 insert 操作，堆排序的时间复杂度为 logk，k 代表 k 个链表，所以整体时间复杂度为 O(nlogk)  
`空间复杂度`：O(k)，因为这里的中间变量只有 heap，而堆的长度就是 k，k 个链表头在 pk。

**官方**

```java
// java
public ListNode mergeTwoLists(ListNode a, ListNode b) {
  if (a == null || b == null) {
    return a != null ? a : b;
  }
  ListNode head = new ListNode(0);
  ListNode tail = head, aPtr = a, bPtr = b;
  while (aPtr != null && bPtr != null) {
    if (aPtr.val < bPtr.val) {
      tail.next = aPtr;
      aPtr = aPtr.next;
    } else {
      tail.next = bPtr;
      bPtr = bPtr.next;
    }
    tail = tail.next;
  }
  tail.next = (aPtr != null ? aPtr : bPtr);
  return head.next;
}
```

**官方-复杂度分析**  
`时间复杂度`：O(n)  
`空间复杂度`：O(1)
