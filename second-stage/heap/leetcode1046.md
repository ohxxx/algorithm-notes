## 1046. 最后一块石头的重量

**描述**

> 有一堆石头，每块石头的重量都是正整数。

> 每一回合，从中选出两块 最重的 石头，然后将它们一起粉碎。假设石头的重量分别为  x 和  y，且  x <= y。那么粉碎的可能结果如下：
>
> - 如果  x == y，那么两块石头都会被完全粉碎；
> - 如果  x != y，那么重量为  x  的石头将会完全粉碎，而重量为  y  的石头新重量为  y-x。

> 最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 0。

**实例**

```
1、
  输入：[2,7,4,1,8,1]
  输出：1
  解释：
  先选出 7 和 8，得到 1，所以数组转换为 [2,4,1,1,1]，
  再选出 2 和 4，得到 2，所以数组转换为 [2,1,1,1]，
  接着是 2 和 1，得到 1，所以数组转换为 [1,1,1]，
  最后选出 1 和 1，得到 0，最终数组转换为 [1]，这就是最后剩下那块石头的重量。
```

> 提示：
>
> - 1 <= stones.length <= 30
> - 1 <= stones[i] <= 1000

**思路**

```
1、因为要知道数组的最大的两位，所以要用到【最大堆】- 官方封装好的
2、然后循环判断计算，使用递归
```

**实现**

```js
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  const newStones = new MaxPriorityQueue();
  let i = -1;
  while (++i < stones.length) {
    newStones.enqueue("", stones[i]);
  }

  const recursiveFn = (heap) => {
    if (heap.isEmpty()) return 0;
    if (heap.size() === 1) return heap.front().priority;
    const diff = heap.dequeue().priority - heap.dequeue().priority;
    if (diff) {
      heap.enqueue("", diff);
    }
    return recursiveFn(heap);
  };

  return recursiveFn(newStones);
};
```

**实现-复杂度分析**  
`时间复杂度`：O(nlog(n))，有个 for、while 循环，因为二插堆的删除是 O(log(n))，又有 n 块石头，所以渐进时间复杂度为 O(nlog(n))  
`空间复杂度`：O(n)，因为有个递归，最多不停掉用 n 次（数组的长度），所以渐进空间复杂度为 O(n)

**官方**

```js
var lastStoneWeight = function (stones) {
  const pq = new MaxPriorityQueue();
  for (const stone of stones) {
    pq.enqueue("x", stone);
  }

  while (pq.size() > 1) {
    const a = pq.dequeue()["priority"];
    const b = pq.dequeue()["priority"];
    if (a > b) {
      pq.enqueue("x", a - b);
    }
  }
  return pq.isEmpty() ? 0 : pq.dequeue()["priority"];
};
```

**官方-复杂度分析**  
`时间复杂度`：O(nlog(n))，其中 n 是石头数量。每次从队列中取出元素需要花费 O(log(n)) 的时间，最多共需要粉碎 n - 1 次石头。  
`空间复杂度`：O(n)。
