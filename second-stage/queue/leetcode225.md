## 225. 用队列实现栈

**描述**

> 请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。

实现 MyStack 类：

- void push(int x) 将元素 x 压入栈顶。
- int pop() 移除并返回栈顶元素。
- int top() 返回栈顶元素。
- boolean empty() 如果栈是空的，返回 true ；否则，返回 false 。

注意：

- 你只能使用队列的基本操作 —— 也就是  push to back、peek/pop from front、size 和  is empty  这些操作。
- 你所使用的语言也许不支持队列。  你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列  , 只要是标准的队列操作即可。

**实例**

```
输入：
  ["MyStack", "push", "push", "top", "pop", "empty"]
  [[], [1], [2], [], [], []]
输出：
  [null, null, null, 2, 2, false]

解释：
  MyStack myStack = new MyStack();
  myStack.push(1);
  myStack.push(2);
  myStack.top(); // 返回 2
  myStack.pop(); // 返回 2
  myStack.empty(); // 返回 False
```

**思路**

```
1、使用两个队列，一个主队列，一个辅助队列
2、入队时放入辅助队中，主队出队放入辅助队
3、交换主队和辅助队
```

**实现**

```js
var MyStack = function () {
  this.queue1 = [];
  this.queue2 = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  this.queue2.push(x);

  while (this.queue1.length) {
    this.queue2.push(this.queue1.shift());
  }
  let temp = this.queue1;
  this.queue1 = this.queue2;
  this.queue2 = temp;
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  return this.queue1.shift();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  return this.queue1[0];
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return !this.queue1.length;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
```

**实现-复杂度分析**  
`时间复杂度`：O(n)：入队为 O(n)，其它为 O(1)  
`空间复杂度`：O(n)，n 代表栈内元素

**官方**

```java
// java
class MyStack {
  Queue<Integer> queue1;
  Queue<Integer> queue2;

  /** Initialize your data structure here. */
  public MyStack() {
    queue1 = new LinkedList<Integer>();
    queue2 = new LinkedList<Integer>();
  }

  /** Push element x onto stack. */
  public void push(int x) {
    queue2.offer(x);
    while (!queue1.isEmpty()) {
      queue2.offer(queue1.poll());
    }
    Queue<Integer> temp = queue1;
    queue1 = queue2;
    queue2 = temp;
  }

  /** Removes the element on top of the stack and returns that element. */
  public int pop() {
    return queue1.poll();
  }

  /** Get the top element. */
  public int top() {
    return queue1.peek();
  }

  /** Returns whether the stack is empty. */
  public boolean empty() {
    return queue1.isEmpty();
  }
}


```

**官方-复杂度分析**  
`时间复杂度`：入栈操作 O(n)，其余操作都是 O(1)，其中 n 是栈内的元素个数。  
`空间复杂度`：O(n)，其中 n 是栈内的元素个数。需要使用两个队列存储栈内的元素。
