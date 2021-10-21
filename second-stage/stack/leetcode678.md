## 678. 有效的括号字符串

**描述**

> 给定一个只包含三种字符的字符串：（ ，） 和 \*，写一个函数来检验这个字符串是否为有效字符串。有效字符串具有如下规则：

- 任何左括号 (  必须有相应的右括号 )。
- 任何右括号 )  必须有相应的左括号 ( 。
- 左括号 ( 必须在对应的右括号之前 )。
- \*  可以被视为单个右括号 ) ，或单个左括号 ( ，或一个空字符串。
- 一个空字符串也被视为有效字符串。

**实例**

```
示例 1:
  输入: "()"
  输出: true
示例 2:
  输入: "(*)"
  输出: true
示例 3:
  输入: "(*))"
  输出: true
```

注意:

- 字符串大小将在 [1，100] 范围内。

**思路**

```
1、专项刷题当然使用专项思路了 - 栈
2、想着用两个栈去管理，一个存"("，一个存"*"
3、然后用")"进行抵消处理
4、另外比较重要的一点就是在栈中存入的是"下标"，用来判断最后剩余的是否能抵消判断
```

**实现**

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  if (!s.length) return false;

  // 左括号栈
  const stack = [];
  // 星星栈
  const starStack = [];

  // 消除可以快速匹配的右括号
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "(":
        {
          stack.push(i);
        }
        break;
      case "*":
        {
          starStack.push(i);
        }
        break;
      case ")":
        {
          // 先用原栈消除，再用星星栈消除
          if (stack.length) {
            stack.pop();
          } else if (starStack.length) {
            starStack.pop();
          } else {
            return false;
          }
        }
        break;
    }
  }

  if (stack.length > starStack.length) return false;

  // 消除剩下的
  while (stack.length && starStack.length) {
    // 关键点 - stack出栈的 一定要小于starStack出栈的
    // 不然无非消除
    if (stack.pop() > starStack.pop()) {
      return false;
    }
  }

  return true;
};
```

> 常见的算法时间复杂度大小
> 由小到大依次为：Ο(1)＜ Ο(log2n)＜ Ο(n)＜ Ο(nlog2n)＜ Ο(n2)＜ Ο(n3)＜ Ο(nk) ＜ Ο(2n) ，随着问题规模 n 的不断增大，上述时间复杂度不断增大，算法的执行效率越低
> while 即为 O(log2n)
> for 即为 O(n)

**实现-复杂度分析**  
`时间复杂度`：O(n)，即 for 循环  
`空间复杂度`：O(n)，即 stack 与 starStack 的长度

**官方**

```js
var checkValidString = function (s) {
  const leftStack = [];
  const asteriskStack = [];
  const n = s.length;
  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (c === "(") {
      leftStack.push(i);
    } else if (c === "*") {
      asteriskStack.push(i);
    } else {
      if (leftStack.length) {
        leftStack.pop();
      } else if (asteriskStack.length) {
        asteriskStack.pop();
      } else {
        return false;
      }
    }
  }
  while (leftStack.length && asteriskStack.length) {
    const leftIndex = leftStack.pop();
    const asteriskIndex = asteriskStack.pop();
    if (leftIndex > asteriskIndex) {
      return false;
    }
  }
  return leftStack.length === 0;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是字符串 s 的长度。需要遍历字符串一次，遍历过程中每个字符的操作时间都是 O(1)，遍历结束之后对左括号栈和星号栈弹出元素的操作次数不会超过 n。  
`空间复杂度`：O(n)，其中 n 是字符串 s 的长度。空间复杂度主要取决于左括号栈和星号栈，两个栈的元素总数不会超过 n。
