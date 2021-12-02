## 76. 最小覆盖子串

**描述**

> 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

> 注意：
>
> - 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
> - 如果 s 中存在这样的子串，我们保证它是唯一的答案。

**实例**

```
1、
  输入：s = "ADOBECODEBANC", t = "ABC"
  输出："BANC"
2、
  输入：s = "ADOBECODEBANC", t = "ABC"
  输出："BANC"
3、
  输入: s = "a", t = "aa"
  输出: ""
  解释: t 中两个字符 'a' 均应包含在 s 的子串中，
  因此没有符合条件的子字符串，返回空字符串。
```

> 提示：
>
> - 1 <= s.length, t.length <= 105
> - s 和 t 由英文字母组成

**思路**

```
1、使用双指针-滑动窗口
2、遍历字符串s
  a、当滑动窗口中的字符不能覆盖t中的字符时，右指针右移，扩大窗口，把右边的字符加入滑动窗口
  b、当滑动窗口中的字符能覆盖t中的字符时，不断左移左指针，缩小窗口，直到窗口中的字符刚好能覆盖t中的字符，这个时候在左移就不能覆盖t中的字符了
  c、在指针移动的过程中，不断更新最小覆盖子串
```

**实现**

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let need = {};
  let win = {};

  // 统计窗口
  for (let str of t) {
    need[str] = (need[str] || 0) + 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;
  let start = 0;
  let len = Number.MAX_VALUE;

  while (right < s.length) {
    let str = s[right];
    right++;

    if (need[str]) {
      win[str] = (win[str] || 0) + 1;
      if (win[str] === need[str]) {
        valid++;
      }
    }

    while (valid === Object.keys(need).length) {
      if (right - left < len) {
        start = left;
        len = right - left;
      }
      let del = s[left];
      left++;
      if (need[del]) {
        if (win[del] === need[del]) {
          valid--;
        }
        win[del]--;
      }
    }
  }

  return len === Number.MAX_VALUE ? "" : s.substr(start, len);
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表字符串 s 的长度  
`空间复杂度`：O(n)，n 代表 t 字符集大小

**官方**

```java
// java
class Solution {
  Map<Character, Integer> ori = new HashMap<Character, Integer>();
  Map<Character, Integer> cnt = new HashMap<Character, Integer>();

  public String minWindow(String s, String t) {
    int tLen = t.length();
    for (int i = 0; i < tLen; i++) {
      char c = t.charAt(i);
      ori.put(c, ori.getOrDefault(c, 0) + 1);
    }
    int l = 0, r = -1;
    int len = Integer.MAX_VALUE, ansL = -1, ansR = -1;
    int sLen = s.length();
    while (r < sLen) {
      ++r;
      if (r < sLen && ori.containsKey(s.charAt(r))) {
        cnt.put(s.charAt(r), cnt.getOrDefault(s.charAt(r), 0) + 1);
      }
      while (check() && l <= r) {
        if (r - l + 1 < len) {
          len = r - l + 1;
          ansL = l;
          ansR = l + len;
        }
        if (ori.containsKey(s.charAt(l))) {
          cnt.put(s.charAt(l), cnt.getOrDefault(s.charAt(l), 0) - 1);
        }
        ++l;
      }
    }
    return ansL == -1 ? "" : s.substring(ansL, ansR);
  }

  public boolean check() {
    Iterator iter = ori.entrySet().iterator();
    while (iter.hasNext()) {
      Map.Entry entry = (Map.Entry) iter.next();
      Character key = (Character) entry.getKey();
      Integer val = (Integer) entry.getValue();
      if (cnt.getOrDefault(key, 0) < val) {
        return false;
      }
    }
    return true;
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：最坏情况下左右指针对 s 的每个元素各遍历一遍，哈希表中对 s 中的每个元素各插入、删除一次，对 t 中的元素各插入一次。每次检查是否可行会遍历整个 t 的哈希表，哈希表的大小与字符集的大小有关，设字符集大小为 C，则渐进时间复杂度为 O(C \* ∣s∣+∣t∣)。
`空间复杂度`：这里用了两张哈希表作为辅助空间，每张哈希表最多不会存放超过字符集大小的键值对，我们设字符集大小为 C ，则渐进空间复杂度为 O(C)。
