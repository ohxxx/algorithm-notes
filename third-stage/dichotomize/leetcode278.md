## 278. 第一个错误的版本

**描述**

> 你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。

> 假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。

> 你可以通过调用  bool isBadVersion(version)  接口来判断版本号 version 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。

**实例**

```
1、
  输入：n = 5, bad = 4
  输出：4
  解释：
  调用 isBadVersion(3) -> false
  调用 isBadVersion(5) -> true
  调用 isBadVersion(4) -> true
  所以，4 是第一个错误的版本。
2、
  输入：n = 1, bad = 1
  输出：1
```

> 提示：
>
> - 1 <= bad <= n <= 231 - 1

**思路**

```
1、找出版本的中间值
2、进行比较
  如果当前中间值是正确的，那么之前的版本都是对的，取后区间
    得：[ mid + 1, ...right ]
  如果当前中间值是错误的，那么之后的版本都是错的，取前区间
    得：[ left, ...mid - 1 ]
```

**实现**

```js
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1;
    let right = n;

    while (left < right) {
      const mid = Math.floor(left + (right - left) / 2);
      if (isBadVersion(mid)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  };
};
```

**实现-复杂度分析**  
`时间复杂度`：O(log(n))，因为二分查找每次检索都是缩小一半，所以二分查找的时间复杂度为 O(log(n))，n 代表版本数量  
`空间复杂度`：O(1)，只使用了常数变量作为辅助空间，故渐进空间复杂度为 O(1)

**官方**

```js
var solution = function (isBadVersion) {
  return function (n) {
    let left = 1,
      right = n;
    while (left < right) {
      // 循环直至区间左右端点相同
      const mid = Math.floor(left + (right - left) / 2); // 防止计算时溢出
      if (isBadVersion(mid)) {
        right = mid; // 答案在区间 [left, mid] 中
      } else {
        left = mid + 1; // 答案在区间 [mid+1, right] 中
      }
    }
    // 此时有 left == right，区间缩为一个点，即为答案
    return left;
  };
};
```

**官方-复杂度分析**  
`时间复杂度`：O(log(n))，其中 n 是给定版本的数量。  
`空间复杂度`：O(1)。我们只需要常数的空间保存若干变量。
