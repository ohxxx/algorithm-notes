## 387. 字符串中的第一个唯一字符

**描述**

> 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

**实例**

```
1、
  s = "leetcode"
  返回 0
2、
  s = "loveleetcode"
  返回 2

```

**思路**

```
1、用队列存储字符串数组和下标
2、用map特性，保证唯一性
3、满足条件出队，剩下队头就是第一个满足条件的
```

**实现**

```js
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const queue = [];
  const strArr = s.split("");
  const strMap = new Map();

  for (let i = 0; i < strArr.length; i++) {
    if (!strMap.has(strArr[i])) {
      strMap.set(strArr[i], i);
      queue.push([strArr[i], i]);
    } else {
      strMap.set(strArr[i], -1);
      while (queue.length && strMap.get(queue[0][0]) === -1) {
        queue.shift();
      }
    }
  }
  return queue.length ? queue[0][1] : -1;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(log(n))，因为有两个循环体 for 与 while，最好情况为 O(n)  
`空间复杂度`：O(2n)，因为创建了队列和 map

**官方**

```js
var firstUniqChar = function (s) {
  const position = new Map();
  const q = [];
  const n = s.length;
  for (let [i, ch] of Array.from(s).entries()) {
    if (!position.has(ch)) {
      position.set(ch, i);
      q.push([s[i], i]);
    } else {
      position.set(ch, -1);
      while (q.length && position.get(q[0][0]) === -1) {
        q.shift();
      }
    }
  }
  return q.length ? q[0][1] : -1;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是字符串 s 的长度。遍历字符串的时间复杂度为 O(n)，而在遍历的过程中我们还维护了一个队列，由于每一个字符最多只会被放入和弹出队列最多各一次，因此维护队列的总时间复杂度为 O(∣Σ∣)，由于 ss 包含的字符种类数一定小于 s 的长度，因此 O(∣Σ∣) 在渐进意义下小于 O(n)，可以忽略。  
`空间复杂度`：O(∣Σ∣)，其中 Σ 是字符集，在本题中 s 只包含小写字母，因此 ∣Σ∣≤26。我们需要 O(∣Σ∣) 的空间存储哈希映射以及队列。
