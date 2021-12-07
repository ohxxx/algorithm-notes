## 1695. 删除子数组的最大得分

**描述**

> 给你一个正整数数组 nums ，请你从中删除一个含有 若干不同元素 的子数组。删除子数组的 得分 就是子数组各元素之 和 。

> 返回 只删除一个 子数组可获得的 最大得分 。

> 如果数组 b 是数组 a 的一个连续子序列，即如果它等于 a[l],a[l+1],...,a[r] ，那么它就是  a 的一个子数组。

**实例**

```
1、
  输入：nums = [4,2,4,5,6]
  输出：17
  解释：最优子数组是 [2,4,5,6]
2、
  输入：nums = [5,2,1,2,5,2,1,2,5]
  输出：8
  解释：最优子数组是 [5,2,1] 或 [1,2,5]
```

> 提示：
>
> - 1 <= nums.length <= 105
> - 1 <= nums[i] <= 104

**思路**

```
1、使用双指针-滑动窗口和map
2、用map进行重复值存储、滑动窗口求子数组的合
3、进行遍历
  a、移动右指针进行值的累加和存储
  b、当有重读数据的时候开始移动左指针，直到无重复数据
  c、最后的结果就是最优子数组
```

**实现**

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumUniqueSubarray = function (nums) {
  let [left, right, ret, sum, map] = [0, 0, 0, 0, new Map()];

  while (right < nums.length) {
    map.set(nums[right], (map.get(nums[right]) || 0) + 1);
    sum += nums[right];

    while (map.get(nums[right]) > 1) {
      map.set(nums[left], map.get(nums[left]) - 1);
      sum -= nums[left];
      left++;
    }

    ret = Math.max(ret, sum);
    right++;
  }

  return ret;
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表 nums 的长度  
`空间复杂度`：O(1)，只是使用了常数变量存储辅助变量，map 的长度最大不超过 nums 的长度，故渐进空间复杂度为 O(1)

**官方**

```js
暂无实例;
```

**官方-复杂度分析**  
`时间复杂度`：-  
`空间复杂度`：-
