## 27. 移除元素

**描述**

> 给你一个数组 nums  和一个值 val，你需要 原地 移除所有数值等于  val  的元素，并返回移除后数组的新长度。
> 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
> 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

> 说明:
> 为什么返回数值是整数，但输出的答案是数组呢?
> 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
> 你可以想象内部操作如下:

```java
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

**实例**

```
1、
  输入：nums = [3,2,2,3], val = 3
  输出：2, nums = [2,2]
  解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
2、
  输入：nums = [0,1,2,2,3,0,4,2], val = 2
  输出：5, nums = [0,1,4,0,3]
  解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
```

> 提示：
>
> - 0 <= nums.length <= 100
> - 0 <= nums[i] <= 50
> - 0 <= val <= 100

**思路**

```
1、使用快慢指针
2、[0, slow]区间均为不等于val的数组
```

**实现**

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let len = nums.length;
  let slow = 0;
  let fast = 0;

  for (; fast < len; fast++) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表数组长度，最多需要遍历 n 次  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```js
var removeElement = function (nums, val) {
  let left = 0,
    right = nums.length;
  while (left < right) {
    if (nums[left] === val) {
      nums[left] = nums[right - 1];
      right--;
    } else {
      left++;
    }
  }
  return left;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 为序列的长度。我们只需要遍历该序列至多一次。  
`空间复杂度`：O(1)。我们只需要常数的空间保存若干变量。
