## 20.有效的括号

**描述**

> 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。

**示例**

```
1、
  输入：s = "()"
  输出：true
2、
  输入：s = "()[]{}"
  输出：true
3、
  输入：s = "(]"
  输出：false
4、
  输入：s = "([)]"
  输出：false
5、
  输入：s = "{[]}"
  输出：true
```

提示：

- 1 <= s.length <= 104
- s 仅由括号 '()[]{}' 组成

**思路**

```
1、专项刷题当然使用专项思路了 - 栈
2、用一个数组进行接收截取的字符串
3、接收的字符串进行映射匹配，匹配成功就出栈，否则入栈
```

**实现**

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (!s || s.length % 2 === 1) return false;
  const arr = s.split("");
  const stack = [];
  const STR_MAP = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (let i = 0; i < arr.length; i++) {
    if (stack.length && stack[stack.length - 1] === STR_MAP[arr[i]]) {
      stack.pop();
    } else {
      stack.push(arr[i]);
    }
  }
  return stack.length === 0;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，及循环的次数。  
`空间复杂度`：O(n+6)，及字符串数量 + STR_MAP 的长度  

**官方**

```js
var isValid = function (s) {
  const n = s.length;
  if (n % 2 === 1) {
    return false;
  }
  const pairs = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);
  const stk = [];
  for (let ch of s) {
    if (pairs.has(ch)) {
      if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
        return false;
      } // 这步是我没有考虑到的
      stk.pop();
    } else {
      stk.push(ch);
    }
  }
  return !stk.length;
};
```

**官方-复杂度分析**  

`时间复杂度`：O(n)，其中 n 是字符串 s 的长度。  
`空间复杂度`：O(n+∣Σ∣)，其中 Σ 表示字符集，本题中字符串只包含 6 种括号，∣Σ∣=6。栈中的字符数量为 O(n)，而哈希表使用的空间为 O(∣Σ∣)，相加即可得到总空间复杂度。  
