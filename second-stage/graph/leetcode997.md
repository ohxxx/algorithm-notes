## 997. 找到小镇的法官

**描述**

> 在一个小镇里，按从 1 到 n 为 n 个人进行编号。传言称，这些人中有一个是小镇上的秘密法官。

> 如果小镇的法官真的存在，那么：
>
> - 小镇的法官不相信任何人。
> - 每个人（除了小镇法官外）都信任小镇的法官。
> - 只有一个人同时满足条件 1 和条件 2 。

> 给定数组  trust，该数组由信任对 trust[i] = [a, b]  组成，表示编号为 a 的人信任编号为 b 的人。

> 如果小镇存在秘密法官并且可以确定他的身份，请返回该法官的编号。否则，返回 -1。

**实例**

```
1、
  输入：n = 2, trust = [[1,2]]
  输出：2
2、
  输入：n = 3, trust = [[1,3],[2,3]]
  输出：3
3、
  输入：n = 3, trust = [[1,3],[2,3],[3,1]]
  输出：-1
4、
  输入：n = 3, trust = [[1,2],[2,3]]
  输出：-1
5、
  输入：n = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
  输出：3
```

**思路**

```
1、整体读下来是一个有向图
2、客根据信任关系，列出 被信任组 与 不被信任组()
```

**实现**

```js
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
  if (n == 1) return 1;

  const trustedArr = new Array(n + 1).fill(0);
  const untrustedArr = new Array(n + 1).fill(0);

  for (let i = 0; i < trust.length; i++) {
    trustedArr[trust[i][1]]++;
    untrustedArr[trust[i][0]]++;
  }

  for (let i = 0; i <= n; i++) {
    if (trustedArr[i] === n - 1 && untrustedArr[i] === 0) {
      return i;
    }
  }

  return -1;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，有两个 for 循环，n 最大可能代表 trust 长度，或者入参 n  
`空间复杂度`：O(n)，有数组，且长度一致，即 n 代表入参 n - 1

**官方**

```js
暂无实例;
```

**官方-复杂度分析**  
`时间复杂度`：-  
`空间复杂度`：-
