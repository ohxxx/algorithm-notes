## 374. 猜数字大小

**描述**

> 猜数字游戏的规则如下：
>
> - 每轮游戏，我都会从  1  到  n 随机选择一个数字。 请你猜选出的是哪个数字。
> - 如果你猜错了，我会告诉你，你猜测的数字比我选出的数字是大了还是小了。
>   你可以通过调用一个预先定义好的接口 int guess(int num) 来获取猜测结果，返回值一共有 3 种可能的情况（-1，1  或 0）：
> - -1：我选出的数字比你猜的数字小 pick < num
> - 1：我选出的数字比你猜的数字大 pick > num
> - 0：我选出的数字和你猜的数字一样。恭喜！你猜对了！pick == num

返回我选出的数字。

**实例**

```
1、
  输入：n = 10, pick = 6
  输出：6
2、
  输入：n = 1, pick = 1
  输出：1
3、
  输入：n = 2, pick = 1
  输出：1
```

**思路**

```
1、分：计算中间元素，分割数组
2、解：递归在较大或者较小 子数组进行二分搜索
3、合：不需要这一步，因为在子数组中搜到就返回了
```

**实现**

```js
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	         -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                   otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  const rec = (low, high) => {
    if (low > high) return;
    const mid = Math.floor((low + high) / 2);
    const res = guess(mid);

    if (res === 0) {
      return mid;
    } else if (res === 1) {
      return rec(mid + 1, high);
    } else {
      return rec(1, mid - 1);
    }
  };

  return rec(1, n);
};
```

**实现-复杂度分析**  
`时间复杂度`：O(logn)，因为是二分搜索  
`空间复杂度`：O(logn)，因为用了递归，调用了堆栈，堆栈中使用变量是要被存起来的，没有被释放。

**官方**

```js
var guessNumber = function (n) {
  let left = 1,
    right = n;
  while (left < right) {
    // 循环直至区间左右端点相同
    const mid = Math.floor(left + (right - left) / 2);
    if (guess(mid) <= 0) {
      right = mid; // 答案在区间 [left, mid] 中
    } else {
      left = mid + 1; // 答案在区间 [mid+1, right] 中
    }
  }
  // 此时有 left == right，区间缩为一个点，即为答案
  return left;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(logn)。时间复杂度即为二分的次数，每次二分我们将区间的长度减小一半，直至区间长度为 1 时二分终止，而区间初始长度为 n，因此二分次数为 O(logn)。  
`空间复杂度`：O(1)。
