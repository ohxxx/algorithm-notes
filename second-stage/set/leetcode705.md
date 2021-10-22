## 705. 设计哈希集合

**描述**

> 不使用任何内建的哈希表库设计一个哈希集合（HashSet）。

实现 MyHashSet 类：

- void add(key) 向哈希集合中插入值 key 。
- bool contains(key) 返回哈希集合中是否存在这个值 key 。
- void remove(key) 将给定值 key 从哈希集合中删除。如果哈希集合中没有这个值，什么也不做。

**实例**

```
1、
  输入：
  ["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
  [[], [1], [2], [1], [3], [2], [2], [2], [2]]
  输出：
  [null, null, null, true, false, null, true, null, false]

  解释：
  MyHashSet myHashSet = new MyHashSet();
  myHashSet.add(1);      // set = [1]
  myHashSet.add(2);      // set = [1, 2]
  myHashSet.contains(1); // 返回 True
  myHashSet.contains(3); // 返回 False ，（未找到）
  myHashSet.add(2);      // set = [1, 2]
  myHashSet.contains(2); // 返回 True
  myHashSet.remove(2);   // set = [1]
  myHashSet.contains(2); // 返回 False ，（已移除）
```

提示：

- 0 <= key <= 106
- 最多调用 104 次 add、remove 和 contains 。

**思路**

```
1、使用对象进行mock
```

**实现**

```js
var MyHashSet = function () {
  this.items = {};
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function (key) {
  if (!this.contains(key)) {
    this.items[key] = key;
  }
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function (key) {
  if (this.contains(key)) {
    delete this.items[key];
  }
};

/**
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function (key) {
  return Object.prototype.hasOwnProperty.call(this.items, key);
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
```

**实现-复杂度分析**  
`时间复杂度`：O(1)，没有任何循环  
`空间复杂度`：O(1)，没有数组和矩阵

**官方**

```js
var MyHashSet = function () {
  this.BASE = 769;
  this.data = new Array(this.BASE).fill(0).map(() => new Array());
};

MyHashSet.prototype.add = function (key) {
  const h = this.hash(key);
  for (const element of this.data[h]) {
    if (element === key) {
      return;
    }
  }
  this.data[h].push(key);
};

MyHashSet.prototype.remove = function (key) {
  const h = this.hash(key);
  const it = this.data[h];
  for (let i = 0; i < it.length; ++i) {
    if (it[i] === key) {
      it.splice(i, 1);
      return;
    }
  }
};

MyHashSet.prototype.contains = function (key) {
  const h = this.hash(key);
  for (const element of this.data[h]) {
    if (element === key) {
      return true;
    }
  }
  return false;
};

MyHashSet.prototype.hash = function (key) {
  return key % this.BASE;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(b/n)。其中 n 为哈希表中的元素数量，b 为链表的数量。假设哈希值是均匀分布的，则每个链表大概长度为 n/b。  
`空间复杂度`：O(n+b)。
