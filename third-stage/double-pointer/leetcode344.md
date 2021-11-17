## 344. 反转字符串

**描述**

> 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

> 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

**实例**

```
1、
  输入：s = ["h","e","l","l","o"]
  输出：["o","l","l","e","h"]
2、
  输入：s = ["H","a","n","n","a","h"]
  输出：["h","a","n","n","a","H"]
```

> 提示：
>
> - 1 <= s.length <= 105
> - s[i] 都是 ASCII 码表中的可打印字符

**思路**

```
1、使用左右指针
2、循环进行左右替换即可
```

**实现**

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，需要循环 n/2 次，n 代表数组长度  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```js
var reverseString = function (s) {
  const n = s.length;
  for (let left = 0, right = n - 1; left < right; ++left, --right) {
    [s[left], s[right]] = [s[right], s[left]];
  }
};
```

**官方-复杂度分析**  
`时间复杂度`：O(N)，其中 N 为字符数组的长度。一共执行了 N/2 次的交换。  
`空间复杂度`：O(1)。只使用了常数空间来存放若干变量。
