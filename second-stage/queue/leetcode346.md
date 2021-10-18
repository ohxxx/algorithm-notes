## 346. 数据流中的移动平均值

**描述**

> 给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算其所有整数的移动平均值。

实现 MovingAverage 类：

- MovingAverage(int size) 用窗口大小 size 初始化对象。
- double next(int val) 计算并返回数据流中最后 size 个值的移动平均值。

**实例**

```
输入：
  ["MovingAverage", "next", "next", "next", "next"]
  [[3], [1], [10], [3], [5]]
输出：
  [null, 1.0, 5.5, 4.66667, 6.0]

解释：
  MovingAverage movingAverage = new MovingAverage(3);
  movingAverage.next(1); // 返回 1.0 = 1 / 1
  movingAverage.next(10); // 返回 5.5 = (1 + 10) / 2
  movingAverage.next(3); // 返回 4.66667 = (1 + 10 + 3) / 3
  movingAverage.next(5); // 返回 6.0 = (10 + 3 + 5) / 3
```

提示：

- 1 <= size <= 1000
- -105 <= val <= 105
- 最多调用 next 方法 104 次

**思路**

```
1、使用队列暂存数据
2、当队长超过size，进行出队、剔除原sum值
3、返回 sum / 队长
```

**实现**

```js
/**
 * @param {number} size
 */
var MovingAverage = function (size) {
  this.queue = [];
  this.size = size;
  this.sum = 0;
};

/**
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function (val) {
  this.queue.push(val);
  this.sum += val;

  if (this.queue.length > this.size) {
    const peek = this.queue.shift();
    this.sum -= peek;
  }

  return this.sum / this.queue.length;
};

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */
```

**实现-复杂度分析**  
`时间复杂度`：O(1)，没有循环没有矩阵  
`空间复杂度`：O(n)，n 代表 queue 长度，同时也是 size + 1

**官方**

```java
// java
class MovingAverage {
  int size;
  List queue = new ArrayList<Integer>();
  public MovingAverage(int size) {
    this.size = size;
  }
​
  public double next(int val) {
    queue.add(val);
    // calculate the sum of the moving window
    int windowSum = 0;
    for(int i = Math.max(0, queue.size() - size); i < queue.size(); ++i)
      windowSum += (int)queue.get(i);
​
    return windowSum * 1.0 / Math.min(queue.size(), size);
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(n)。其中 n 是移动窗口的大小，每次调用 next(val)，我们需要从 queue 中检索 n 个元素。  
`空间复杂度`：O(m)，是 queue 的大小。
