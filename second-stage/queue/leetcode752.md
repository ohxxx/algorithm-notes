## 752. 打开转盘锁

**描述**

> 你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有 10 个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转：例如把 '9' 变为  '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。

> 锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。

> 列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。

> 字符串 target 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 -1 。

**实例**

```
1、
  输入：deadends = ["0201","0101","0102","1212","2002"], target = "0202"
  输出：6
  解释：
    可能的移动序列为 "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202"。
    注意 "0000" -> "0001" -> "0002" -> "0102" -> "0202" 这样的序列是不能解锁的，
    因为当拨动到 "0102" 时这个锁就会被锁定。
2、
  输入: deadends = ["8888"], target = "0009"
  输出：1
  解释：把最后一位反向旋转一次即可 "0000" -> "0009"。
3、
  输入: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
  输出：-1
  解释：无法旋转到目标数字且不被锁定。
4、
  输入: deadends = ["0000"], target = "8888"
  输出：-1
```

> 提示：
>
> - 1 <= deadends.length <= 500
> - deadends[i].length == 4
> - target.length == 4
> - target 不在 deadends 之中
> - target 和 deadends[i] 仅由若干位数字组成

**思路**

```
1、使用队列暂存锁盘队列，并创建一个辅助队列（已经访问过的锁）
2、循环当前锁，然后进行旋转，再进行判断
```

**实现**

```js
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  // 边界 - 默认不旋转
  if (target === "0000") return 0;
  // 边界 - 死锁
  const taboo = new Set(deadends);
  if (taboo.has("0000")) return -1;

  // 步骤
  let step = 0;
  // 锁盘队列
  const queue = [];
  // 初始化锁盘
  queue.push("0000");
  // 标记 - 看过的
  const markSeen = new Set();
  markSeen.add("0000");

  while (queue.length) {
    ++step;
    const size = queue.length;
    for (let i = 0; i < size; ++i) {
      // 当前锁状态
      const cur = queue.shift();
      // 旋转锁,然后搜索
      for (const nextState of rotationLock(cur)) {
        if (!markSeen.has(nextState) && !taboo.has(nextState)) {
          // 当前锁的状态与目标相同
          if (nextState === target) return step;
          // 没到达终点,继续
          queue.push(nextState);
          markSeen.add(nextState);
        }
      }
    }
  }

  return -1;
};

// 旋转锁
const rotationLock = (tar) => {
  const ret = [];
  const tarArr = Array.from(tar);
  for (let i = 0; i < 4; i++) {
    const num = tarArr[i] + "";
    tarArr[i] = num === "0" ? "9" : parseInt(num) - 1;
    ret.push(tarArr.join(""));
    tarArr[i] = num === "9" ? "0" : parseInt(num) + 1;
    ret.push(tarArr.join(""));
    tarArr[i] = num;
  }
  return ret;
};
```

**实现-复杂度分析**  
`时间复杂度`：-  
`空间复杂度`：-

**官方**

```js
var openLock = function (deadends, target) {
  if (target === "0000") {
    return 0;
  }

  const dead = new Set(deadends);
  if (dead.has("0000")) {
    return -1;
  }

  let step = 0;
  const queue = [];
  queue.push("0000");
  const seen = new Set();
  seen.add("0000");

  while (queue.length) {
    ++step;
    const size = queue.length;
    for (let i = 0; i < size; ++i) {
      const status = queue.shift();
      for (const nextStatus of get(status)) {
        if (!seen.has(nextStatus) && !dead.has(nextStatus)) {
          if (nextStatus === target) {
            return step;
          }
          queue.push(nextStatus);
          seen.add(nextStatus);
        }
      }
    }
  }

  return -1;
};

const numPrev = (x) => {
  return x === "0" ? "9" : parseInt(x) - 1 + "";
};

const numSucc = (x) => {
  return x === "9" ? "0" : parseInt(x) + 1 + "";
};

// 枚举 status 通过一次旋转得到的数字
const get = (status) => {
  const ret = [];
  const array = Array.from(status);
  for (let i = 0; i < 4; ++i) {
    const num = array[i];
    array[i] = numPrev(num);
    ret.push(array.join(""));
    array[i] = numSucc(num);
    ret.push(array.join(""));
    array[i] = num;
  }

  return ret;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(b^d \* d^2 + md)，其中 b 是数字的进制，d 是转盘数字的位数，m 是数组 deadends 的长度，在本题中 b=10，d=4。

- 转盘数字的可能性一共有 b^d 种，这也是我们可以搜索到的状态数上限。对于每一个转盘数字，我们需要 O(d) 的时间枚举旋转的数位，同时需要 O(d) 的时间生成旋转后的数字（即加入队列），因此广度优先搜索的总时间复杂度为 O(b^d \* d^2 + md)
- 此外，在搜索前我们需要将 deadends 中的所有元素放入哈希表中，计算一个字符串哈希值需要的时间为 O(d)，因此需要的总时间为 O(md)。

`空间复杂度`：O(b^d \* d + m)

- 我们最多需要在队列中存储 O(b^d) 个长度为 d 的字符串，空间复杂度为 O(b^d \* d)
- 哈希表需要 O(m) 的空间。如果使用的语言存储的是元素的拷贝，那么需要的空间为 O(md)。
