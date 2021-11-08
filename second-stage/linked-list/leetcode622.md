## 622. 设计循环队列

**描述**

> 设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。

> 循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。

> 你的实现应该支持如下操作：
>
> - MyCircularQueue(k): 构造器，设置队列长度为 k 。
> - Front: 从队首获取元素。如果队列为空，返回 -1 。
> - Rear: 获取队尾元素。如果队列为空，返回 -1 。
> - enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
> - deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
> - isEmpty(): 检查循环队列是否为空。
> - isFull(): 检查循环队列是否已满。

**实例**

```
1、
  MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
  circularQueue.enQueue(1);  // 返回 true
  circularQueue.enQueue(2);  // 返回 true
  circularQueue.enQueue(3);  // 返回 true
  circularQueue.enQueue(4);  // 返回 false，队列已满
  circularQueue.Rear();  // 返回 3
  circularQueue.isFull();  // 返回 true
  circularQueue.deQueue();  // 返回 true
  circularQueue.enQueue(4);  // 返回 true
  circularQueue.Rear();  // 返回 4
```

**思路**

```
1、使用单链表做虚拟环
2、入队出队只需要改变链表指向即可
```

**实现**

```js
class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.maxLen = k;
  this.count = 0;
  this.head = null;
  this.tail = null;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) return false;

  const newNode = new Node(value);
  if (this.count === 0) {
    this.head = this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
  this.count++;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false;

  this.head = this.head.next;
  this.count--;
  return true;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) return -1;

  return this.head.val;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) return -1;

  return this.tail.val;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  return this.count === 0;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  return this.count === this.maxLen;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
```

**实现-复杂度分析**  
`时间复杂度`：O(1)，没有任何循环或递归，所以时间复杂度为 O(1)  
`空间复杂度`：O(n)，因为创建了链表，n 代表链表长度

**官方**

```java
// java
class Node {
  public int value;
  public Node nextNode;

  public Node(int value) {
    this.value = value;
    this.nextNode = null;
  }
}

class MyCircularQueue {

  private Node head, tail;
  private int count;
  private int capacity;

  /** Initialize your data structure here. Set the size of the queue to be k. */
  public MyCircularQueue(int k) {
    this.capacity = k;
  }

  /** Insert an element into the circular queue. Return true if the operation is successful. */
  public boolean enQueue(int value) {
    if (this.count == this.capacity)
      return false;

    Node newNode = new Node(value);
    if (this.count == 0) {
      head = tail = newNode;
    } else {
      tail.nextNode = newNode;
      tail = newNode;
    }
    this.count += 1;
    return true;
  }

  /** Delete an element from the circular queue. Return true if the operation is successful. */
  public boolean deQueue() {
    if (this.count == 0)
      return false;
    this.head = this.head.nextNode;
    this.count -= 1;
    return true;
  }

  /** Get the front item from the queue. */
  public int Front() {
    if (this.count == 0)
      return -1;
    else
      return this.head.value;
  }

  /** Get the last item from the queue. */
  public int Rear() {
    if (this.count == 0)
      return -1;
    else
      return this.tail.value;
  }

  /** Checks whether the circular queue is empty or not. */
  public boolean isEmpty() {
    return (this.count == 0);
  }

  /** Checks whether the circular queue is full or not. */
  public boolean isFull() {
    return (this.count == this.capacity);
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(1)。该数据结构中，所有方法都具有恒定的时间复杂度。  
`空间复杂度`：O(N)，与数组实现相同。但是单链表实现 f 方式的内存效率更高。
