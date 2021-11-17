## 167. 两数之和 II - 输入有序数组

**描述**

> 给定一个已按照 非递减顺序排列   的整数数组  numbers ，请你从数组中找出两个数满足相加之和等于目标数  target 。

> 函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。numbers 的下标 从 1 开始计数 ，所以答案数组应当满足 1 <= answer[0] < answer[1] <= numbers.length 。

> 你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

**实例**

```
1、
  输入：numbers = [2,7,11,15], target = 9
  输出：[1,2]
  解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
2、
  输入：numbers = [2,3,4], target = 6
  输出：[1,3]
3、
  输入：numbers = [-1,0], target = -1
  输出：[1,2]
```

> 提示：
>
> - 2 <= numbers.length <= 3 \* 104
> - -1000 <= numbers[i] <= 1000
> - numbers 按 非递减顺序 排列
> - -1000 <= target <= 1000
> - 仅存在一个有效答案

**思路**

```
1、定义左右指针
2、比对
  如果左右指针之和 < 目标值
    答案在 [ left + 1, ...right ] 中
  如果左右指针之和 > 目标值
    答案在 [ left, ...right - 1 ] 中
  直到相等
```

**实现**

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let left = 0; // 第一个元素
  let right = numbers.length - 1; // 最后一个元素
  const ret = [];

  while (left < right) {
    let count = numbers[left] + numbers[right];
    // 如果相等就返回
    if (count === target) {
      ret.push(left + 1, right + 1);
      return ret;
    } else if (count < target) {
      // 答案在 [left++, right]
      left++;
    } else if (count > target) {
      // 答案在 [left, right--]
      right--;
    }
  }
  return ret;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，因为左右指针最多移动 n 次，n 代表数组长度  
`空间复杂度`：O(1)，只使用了常数变量作为辅助空间，故渐进时间复杂度为 O(1)

**官方**

```java
// java
class Solution {
  public int[] twoSum(int[] numbers, int target) {
    int low = 0, high = numbers.length - 1;
    while (low < high) {
      int sum = numbers[low] + numbers[high];
      if (sum == target) {
        return new int[]{low + 1, high + 1};
      } else if (sum < target) {
        ++low;
      } else {
        --high;
      }
    }
    return new int[]{-1, -1};
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是数组的长度。两个指针移动的总次数最多为 n 次。  
`空间复杂度`：O(1)。
