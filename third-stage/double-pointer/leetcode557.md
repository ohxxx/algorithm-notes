## 557. 反转字符串中的单词 III

**描述**

> 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

**实例**

```
1、
  给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
```

**思路**

```
1、先找到空格，改变右指针位置
2、缩短左右指针区间，反转
```

**实现**

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let left = 0;
  let right = 0;
  let arr = Array.from(s);

  while (left < arr.length) {
    // 先找到空格
    // 改变右指针位置
    // 形成 [ letf, ... right] 一个完整单词
    while (arr[right] && arr[right] !== " ") {
      right++;
    }

    // 当前完整单词左右指针缩小区间
    // 进行反转数组中单个符号
    for (let l = left, r = right - 1; l < r; l++, r--) {
      [arr[l], arr[r]] = [arr[r], arr[l]];
    }

    // 继续下一个
    left = right + 1;
    right = left;
  }

  return arr.join("");
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表字符串 s 的长度，每个字符都会被操作一次，故总时间复杂度为 O(n)  
`空间复杂度`：O(n)，创建了字符串 s 长度的数组，n 代表字符串长度。

**官方**

```js
var reverseWords = function (s) {
  const ret = [];
  const length = s.length;
  let i = 0;
  while (i < length) {
    let start = i;
    while (i < length && s.charAt(i) != " ") {
      i++;
    }
    for (let p = start; p < i; p++) {
      ret.push(s.charAt(start + i - 1 - p));
    }
    while (i < length && s.charAt(i) == " ") {
      i++;
      ret.push(" ");
    }
  }
  return ret.join("");
};
```

**官方-复杂度分析**  
`时间复杂度`：O(N)，其中 N 为字符串的长度。原字符串中的每个字符都会在 O(1) 的时间内放入新字符串中。
`空间复杂度`：O(N)。我们开辟了与原字符串等大的空间。
