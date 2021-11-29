## 643. 子数组最大平均数 I

**描述**

> 给你一个由 n 个元素组成的整数数组 nums 和一个整数 k 。
> 请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数。
> 任何误差小于 10-5 的答案都将被视为正确答案。

**实例**

```
1、
  输入：nums = [1,12,-5,-6,50,3], k = 4
  输出：12.75
  解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
2、
  输入：nums = [5], k = 1
  输出：5.00000
```

> 提示：
>
> - n == nums.length
> - 1 <= k <= n <= 105
> - -104 <= nums[i] <= 104

**思路**

```
1、使用双指针-滑动窗口
2、先求出第一个窗口的总和
3、每次移动窗口进行加头数，去尾数，直到右指针到右边界
```

**实现**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let len = nums.length;
  let right = k;
  let temp = 0;

  for (let i = 0; i < k; i++) {
    temp += nums[i];
  }

  let ret = temp;
  for (; right < len; right++) {
    temp = temp + nums[right] - nums[right - k];
    ret = Math.max(ret, temp);
  }

  return ret / k;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表数组长度  
`空间复杂度`：O(1)，只使用了常数空间存放辅助变量，故渐进空间复杂度为 O(1)

**官方**

```js
var findMaxAverage = function (nums, k) {
  let sum = 0;
  const n = nums.length;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  let maxSum = sum;
  for (let i = k; i < n; i++) {
    sum = sum - nums[i - k] + nums[i];
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum / k;
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 nn 是数组 nums 的长度。遍历数组一次。  
`空间复杂度`：O(1)
