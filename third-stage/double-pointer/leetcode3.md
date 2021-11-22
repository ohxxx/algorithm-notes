## 3. 无重复字符的最长子串

**描述**

> 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

**实例**

```
1、
  输入: s = "abcabcbb"
  输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
2、
  输入: s = "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
3、
  输入: s = "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
       请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
4、
  输入: s = ""
  输出: 0
```

> 提示：
>
> - 0 <= s.length <= 5 \* 104
> - s 由英文字母、数字、符号和空格组成

**思路**

```
1、使用滑动窗口
2、
  先移动右指针，并将当前指针下标的值添加进set
  直到set中有重复值出现，删除并移动左指针
```

**实现**

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (!s || s === "") return 0;
  if (s.length === 1) return 1;

  let set = new Set();
  let ret = 0;

  let right = -1;
  let left = 0;

  while (left < s.length) {
    if (right + 1 < s.length && !set.has(s.charAt(right + 1))) {
      set.add(s.charAt(right + 1));
      right++;
    } else {
      set.delete(s.charAt(left));
      left++;
    }

    ret = Math.max(ret, right - left + 1);
  }

  return ret;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，需要循环 n 次，要遍历整个字符串，n 代表字符串长度  
`空间复杂度`：O(n)，使用了辅助变量 set，set 最坏情况就是字符串的长度，即 n 代表字符串长度

**官方**

```js
var lengthOfLongestSubstring = function (s) {
  // 哈希集合，记录每个字符是否出现过
  const occ = new Set();
  const n = s.length;
  // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
  let rk = -1,
    ans = 0;
  for (let i = 0; i < n; ++i) {
    if (i != 0) {
      // 左指针向右移动一格，移除一个字符
      occ.delete(s.charAt(i - 1));
    }
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      // 不断地移动右指针
      occ.add(s.charAt(rk + 1));
      ++rk;
    }
    // 第 i 到 rk 个字符是一个极长的无重复字符子串
    ans = Math.max(ans, rk - i + 1);
  }
  return ans;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(N)，其中 N 是字符串的长度。左指针和右指针分别会遍历整个字符串一次。  
`空间复杂度`：O(∣Σ∣)，其中 Σ 表示字符集（即字符串中可以出现的字符），∣Σ∣ 表示字符集的大小。在本题中没有明确说明字符集，因此可以默认为所有 ASCII 码在 [0, 128)[0,128) 内的字符，即 ∣Σ∣=128。我们需要用到哈希集合来存储出现过的字符，而字符最多有 ∣Σ∣ 个，因此空间复杂度为 O(∣Σ∣)。
