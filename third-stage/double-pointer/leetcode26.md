## 26. 删除有序数组中的重复项

**描述**

> 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。

> 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

> 说明:
> 为什么返回数值是整数，但输出的答案是数组呢?
> 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

> 你可以想象内部操作如下:

```java
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

**实例**

```
1、
  输入：nums = [1,1,2]
  输出：2, nums = [1,2]
  解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
2、
  输入：nums = [0,0,1,1,1,2,2,3,3,4]
  输出：5, nums = [0,1,2,3,4]
  解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
```

> 提示：
>
> - 0 <= nums.length <= 3 \* 104
> - -104 <= nums[i] <= 104
> - nums 已按升序排列

**思路**

```
1、使用快慢指针
2、循环判断
  快慢指针下标的值不相等就进行移动慢指针
  并替换快慢指针下标的值
```

**实现**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let len = nums.length;

  if (len < 2) return len;

  let slow = 0;
  for (let fast = 1; fast < len; fast++) {
    if (nums[fast] !== nums[slow]) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow + 1;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，这里数组的长度是 n， i 和 j 分别最多走 n 步  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```js
var removeDuplicates = function (nums) {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let fast = 1,
    slow = 1;
  while (fast < n) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      ++slow;
    }
    ++fast;
  }
  return slow;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 是数组的长度。快指针和慢指针最多各移动 n 次。  
`空间复杂度`：：O(1)。只需要使用常数的额外空间。
