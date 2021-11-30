## 1456. 定长子串中元音的最大数目

**描述**

> 给你字符串 s 和整数 k 。
> 请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。
> 英文中的 元音字母 为（a, e, i, o, u）。

**实例**

```
1、
  输入：s = "abciiidef", k = 3
  输出：3
  解释：子字符串 "iii" 包含 3 个元音字母。
2、
  输入：s = "aeiou", k = 2
  输出：2
  解释：任意长度为 2 的子字符串都包含 2 个元音字母。
3、
  输入：s = "leetcode", k = 3
  输出：2
  解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。
4、
  输入：s = "rhythms", k = 4
  输出：0
  解释：字符串 s 中不含任何元音字母。
5、
  输入：s = "tryhard", k = 4
  输出：1
```

> 提示：
>
> - 1 <= s.length <= 10^5
> - s 由小写英文字母组成
> - 1 <= k <= s.length

**思路**

```
1、使用双指针-滑动窗口
2、先初始化窗口的大小
3、再移动窗口，并根据当前窗口内容取值
```

**实现**

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  let len = s.length;
  let left = 0;
  let right = 0;
  let count = 0;

  while (right < k) {
    if (isVowel(s[right])) count++;
    right++;
  }

  let ret = count;
  while (right < len) {
    if (isVowel(s[right])) count++;
    if (isVowel(s[left])) count--;
    left++;
    right++;
    ret = Math.max(ret, count);
  }

  return ret;
};

const isVowel = (str) => {
  return str === "a" || str === "e" || str === "i" || str === "o" || str === "u"
    ? true
    : false;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表字符串长度，需要遍历整个字符串  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```java
// java
class Solution {
  public int maxVowels(String s, int k) {
    int n = s.length();
    int vowel_count = 0;
    for (int i = 0; i < k; ++i) {
      vowel_count += isVowel(s.charAt(i));
    }
    int ans = vowel_count;
    for (int i = k; i < n; ++i) {
      vowel_count += isVowel(s.charAt(i)) - isVowel(s.charAt(i - k));
      ans = Math.max(ans, vowel_count);
    }
    return ans;
  }

  public int isVowel(char ch) {
    return ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' ? 1 : 0;
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(∣s∣)，其中 |s| 是字符串 s 的长度。我们首先需要 O(k) 的时间求出前 k 个字母组成的子串包含的元音字母个数，在这之后还有 O(|s|-k) 个子串，每个子串包含的元音字母个数可以在 O(1) 的时间计算出，因此总时间复杂度为 O(∣s∣)。
`空间复杂度`：O(1)
