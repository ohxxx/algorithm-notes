## 155. 最小栈

**描述**

> 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

```
1、push(x) —— 将元素 x 推入栈中。
2、pop() —— 删除栈顶的元素。
3、top() —— 获取栈顶元素。
4、getMin() —— 检索栈中的最小元素。
```

**实例**

```js
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
```

提示：

- pop、top 和 getMin 操作总是在 非空栈 上调用。

**思路**

```
1、专项刷题当然使用专项思路了 - 栈
2、我认为问题描述中比较关键的点在于`常数时间内`，然后再结合下面fn说明关键点在于getMin()的实现
3、然后就想到辅助栈进行解决
```

**实现**

```js
var stack = [],
  sortStack = [];

var MinStack = function () {
  stack = [];
  sortStack = [];
};

MinStack.prototype.push = function (val) {
  stack.push(val);
  if (!sortStack.length) {
    sortStack.push(val);
  } else {
    const len = sortStack.length;
    const result = val < sortStack[len - 1] ? val : sortStack[len - 1];
    sortStack.push(result);
  }
};

MinStack.prototype.pop = function () {
  if (!stack.length) return null;
  stack.pop();
  sortStack.pop();
};

MinStack.prototype.top = function () {
  if (!stack.length) return null;
  return stack[stack.length - 1];
};

MinStack.prototype.getMin = function () {
  if (!sortStack.length) return null;
  return sortStack[sortStack.length - 1];
};
```

**实现-复杂度分析**  
`时间复杂度`：O(1)，即 push、top、pop、getMin 方法都是 O(1)  
`空间复杂度`：O(n)，即就是暂存的数组长度 n

**官方**

```js
var MinStack = function () {
  this.x_stack = [];
  this.min_stack = [Infinity];
};

MinStack.prototype.push = function (x) {
  this.x_stack.push(x);
  // 这步有点意思
  this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

MinStack.prototype.pop = function () {
  this.x_stack.pop();
  this.min_stack.pop();
};

MinStack.prototype.top = function () {
  return this.x_stack[this.x_stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.min_stack[this.min_stack.length - 1];
};
```

**官方-复杂度分析**  
`时间复杂度`：O(1)，因为栈的插入、删除与读取操作都是 O(1)，我们定义的每个操作最多调用栈操作两次。  
`空间复杂度`：O(n)，其中 n 为总操作数。最坏情况下，我们会连续插入 n 个元素，此时两个栈占用的空间为 O(n)。
