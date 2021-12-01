## 1446. 连续字符

**描述**

> 给你一个字符串 s ，字符串的「能量」定义为：只包含一种字符的最长非空子字符串的长度。
> 请你返回字符串的能量。

**实例**

```
1、
  输入：s = "leetcode"
  输出：2
  解释：子字符串 "ee" 长度为 2 ，只包含字符 'e' 。
2、
  输入：s = "abbcccddddeeeeedcba"
  输出：5
  解释：子字符串 "eeeee" 长度为 5 ，只包含字符 'e' 。
3、
  输入：s = "triplepillooooow"
  输出：5
4、
  输入：s = "hooraaaaaaaaaaay"
  输出：11
5、
  输入：s = "tourist"
  输出：1
```

> 提示：
>
> - 1 <= s.length <= 500
> - s 只包含小写英文字母。

**思路**

```
1、使用双指针-左右指针
2、[left, right]区间代表连续字符，求最大值即可
```

**实现**

```js
/**
 * @param {string} s
 * @return {number}
 */
var maxPower = function (s) {
  let len = s.length;
  let left = 0;
  let right = 0;
  let ret = 0;

  while (right < len) {
    if (s[right] !== s[right - 1]) {
      left = right;
    }
    right++;
    ret = Math.max(ret, right - left);
  }

  return ret;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表字符串长度，需要循环一次整个字符串  
`空间复杂度`：O(n)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```js
var maxPower = function (s) {
  let ans = 1,
    cnt = 1;
  for (let i = 1; i < s.length; ++i) {
    if (s[i] == s[i - 1]) {
      ++cnt;
      ans = Math.max(ans, cnt);
    } else {
      cnt = 1;
    }
  }
  return ans;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是字符串 s 的长度。遍历一次 s 的时间复杂度为 O(n)。  
`空间复杂度`：O(1)。我们只需要常数的空间保存若干变量。
