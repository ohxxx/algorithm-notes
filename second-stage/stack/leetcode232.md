## 232. 用栈实现队列

**描述**

> 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：

- void push(int x) 将元素 x 推到队列的末尾
- int pop() 从队列的开头移除并返回元素
- int peek() 返回队列开头的元素
- boolean empty() 如果队列为空，返回 true ；否则，返回 false

说明：

> 你只能使用标准的栈操作 —— 也就是只有  push to top, peek/pop from top, size, 和  is empty  操作是合法的。
> 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

进阶：

> 你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。

**实例**

```
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false

```

提示：

- 1 <= x <= 9
- 最多调用 100 次 push、pop、peek 和 empty
- 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）

**思路**

```
1、因为要实现一个队列，而队列是首尾两端操作，所以一个栈肯定满足不了
2、两个栈进行完成，一个进行队列操作处理，一个临时存储栈的数据（反转数据）
```

**实现**

```js
var MyQueue = function () {
  this.stack = [];
  this.tempStack = [];
};

MyQueue.prototype.push = function (x) {
  this.stack.push(x);
};

MyQueue.prototype.pop = function () {
  if (this.tempStack.length) {
    return this.tempStack.pop();
  }
  while (this.stack.length) {
    this.tempStack.push(this.stack.pop());
  }
  return this.tempStack.pop();
};

MyQueue.prototype.peek = function () {
  const tempPop = this.pop();
  this.tempStack.push(tempPop);
  return tempPop;
};

MyQueue.prototype.empty = function () {
  return !this.stack.length && !this.tempStack.length;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(1)，即 pop 和 peek 的均摊时间为 O(1)，push 和 empty 为 O(1)  
`空间复杂度`：O(n)，即栈长度

**官方**

```js
var MyQueue = function () {
  this.inStack = [];
  this.outStack = [];
};

MyQueue.prototype.push = function (x) {
  this.inStack.push(x);
};

MyQueue.prototype.pop = function () {
  if (!this.outStack.length) {
    this.in2out();
  }
  return this.outStack.pop();
};

MyQueue.prototype.peek = function () {
  if (!this.outStack.length) {
    this.in2out();
  }
  return this.outStack[this.outStack.length - 1];
};

MyQueue.prototype.empty = function () {
  return this.outStack.length === 0 && this.inStack.length === 0;
};

MyQueue.prototype.in2out = function () {
  while (this.inStack.length) {
    this.outStack.push(this.inStack.pop());
  }
};
```

**官方-复杂度分析**  
`时间复杂度`：O(1)，push 和 empty 为 O(1)，pop 和 peek 为均摊 O(1)。对于每个元素，至多入栈和出栈各两次，故均摊复杂度为 O(1)。  
`空间复杂度`：O(n)，其中 n 是操作总数。对于有 n 次 push 操作的情况，队列中会有 n 个元素，故空间复杂度为 O(n)。
