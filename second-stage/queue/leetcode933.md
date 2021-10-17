## 933. 最近的请求次数

**描述**

> 写一个  RecentCounter  类来计算特定时间范围内最近的请求。

请你实现 RecentCounter 类：

- RecentCounter() 初始化计数器，请求数为 0 。
- int ping(int t) 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 [t-3000, t] 内发生的请求数。

保证 每次对 ping 的调用都使用比之前更大的 t 值。

**实例**

```
输入：
  ["RecentCounter", "ping", "ping", "ping", "ping"]
  [[], [1], [100], [3001], [3002]]
输出：
  [null, 1, 2, 3, 3]

解释：
  RecentCounter recentCounter = new RecentCounter();
  recentCounter.ping(1);     // requests = [1]，范围是 [-2999,1]，返回 1
  recentCounter.ping(100);   // requests = [1, 100]，范围是 [-2900,100]，返回 2
  recentCounter.ping(3001);  // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3
  recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3
```

**思路**

```
1、使用队列
2、有新请求就入队，3000ms前发出的请求就出对
3、返回队列长度 = 最近请求次数
```

**实现**

```js
var RecentCounter = function () {
  this.queue = [];
};

RecentCounter.prototype.ping = function (t) {
  this.queue.push(t);
  while (this.queue[0] < t - 3000) {
    this.queue.shift();
  }

  return this.queue.length;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n), 因为有个 while 循环体，n 代表需要踢出队的请求个数
`空间复杂度`：O(n)，因为创建了一个数组（队列），n 代表数组长度

**官方**

```python
class RecentCounter(object):
  def __init__(self):
    self.q = collections.deque()

  def ping(self, t):
    self.q.append(t)
    while self.q[0] < t-3000:
      self.q.popleft()
      return len(self.q)


```

**官方-复杂度分析**  
`时间复杂度`：O(Q)，其中 Q 是 ping 的次数。
`空间复杂度`：O(W)，其中 W = 3000 是队列中最多存储的 ping 的记录数目。
