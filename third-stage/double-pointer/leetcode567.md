## 567. 字符串的排列

**描述**

> 给你两个字符串  s1  和  s2 ，写一个函数来判断 s2 是否包含 s1  的排列。如果是，返回 true ；否则，返回 false 。
> 换句话说，s1 的排列之一是 s2 的 子串 。

**实例**

```
1、
  输入：s1 = "ab" s2 = "eidbaooo"
  输出：true
  解释：s2 包含 s1 的排列之一 ("ba").
2、
  输入：s1= "ab" s2 = "eidboaoo"
  输出：false
```

> 提示：
>
> - 1 <= s1.length, s2.length <= 104
> - s1 和 s2 仅包含小写字母

**思路**

```
1、使用双指针-滑动窗口
2、遍历s2
  a、移动右指针，直到滑动窗口长度大于等于s1的长度
  b、移动左指针，判断是当前的valid是否与need窗口大小相同
  c、不符合就返回false

```

**实现**

```js
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  let need = new Map();
  for (let i of s1) {
    need.set(i, (need.get(i) || 0) + 1);
  }

  let left = 0;
  let right = 0;
  let window = new Map();
  let valid = 0;

  while (right < s2.length) {
    const cur = s2[right++];
    if (need.has(cur)) {
      window.set(cur, (window.get(cur) || 0) + 1);
      if (window.get(cur) == need.get(cur)) valid++;
    }

    while (right - left >= s1.length) {
      if (valid === need.size) return true;
      const cur = s2[left++];
      if (need.has(cur)) {
        if (window.get(cur) == need.get(cur)) valid--;
        window.set(cur, window.get(cur) - 1);
      }
    }
  }
  return false;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表 s2 的长度  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```js
var checkInclusion = function (s1, s2) {
  const n = s1.length,
    m = s2.length;
  if (n > m) {
    return false;
  }
  const cnt = new Array(26).fill(0);
  for (let i = 0; i < n; ++i) {
    --cnt[s1[i].charCodeAt() - "a".charCodeAt()];
    ++cnt[s2[i].charCodeAt() - "a".charCodeAt()];
  }
  let diff = 0;
  for (const c of cnt) {
    if (c !== 0) {
      ++diff;
    }
  }
  if (diff == 0) {
    return true;
  }
  for (let i = n; i < m; ++i) {
    const x = s2[i].charCodeAt() - "a".charCodeAt(),
      y = s2[i - n].charCodeAt() - "a".charCodeAt();
    if (x == y) {
      continue;
    }
    if (cnt[x] == 0) {
      ++diff;
    }
    ++cnt[x];
    if (cnt[x] == 0) {
      --diff;
    }
    if (cnt[y] == 0) {
      ++diff;
    }
    --cnt[y];
    if (cnt[y] == 0) {
      --diff;
    }
    if (diff == 0) {
      return true;
    }
  }
  return false;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n+m+∣Σ∣)，其中 n 是字符串 s1 的长度，m 是字符串 s2 的长度，Σ 是字符集，这道题中的字符集是小写字母，∣Σ∣=26。
`空间复杂度`：O(∣Σ∣)
