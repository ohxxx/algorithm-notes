## 189. 轮转数组

**描述**

> 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

**实例**

```
1、
  输入: nums = [1,2,3,4,5,6,7], k = 3
  输出: [5,6,7,1,2,3,4]
  解释:
  向右轮转 1 步: [7,1,2,3,4,5,6]
  向右轮转 2 步: [6,7,1,2,3,4,5]
  向右轮转 3 步: [5,6,7,1,2,3,4]
2、
  输入：nums = [-1,-100,3,99], k = 2
  输出：[3,99,-1,-100]
  解释:
  向右轮转 1 步: [99,-1,-100,3]
  向右轮转 2 步: [3,99,-1,-100]
```

> 提示：
>
> - 1 <= nums.length <= 105
> - -231 <= nums[i] <= 231 - 1
> - 0 <= k <= 105

> 进阶：
>
> - 尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
> - 你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？

**思路**

```
1、反转整个数组
2、然后反转前半段
3、再反转后半段
```

**实现**

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  const reverse = (nums, start, end) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
    return nums;
  };

  k %= nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n)，n 代表数组的长度，因为每个元素被翻转两次，一共 n 个元素，因此总时间复杂度为 O(2n) = O(n)。  
`空间复杂度`：O(1)。只使用了常数变量作为辅助空间，故渐进空间复杂度为 O(1)。

**官方**

```js
const gcd = (x, y) => (y ? gcd(y, x % y) : x);

var rotate = function (nums, k) {
  const n = nums.length;
  k = k % n;
  let count = gcd(k, n);
  for (let start = 0; start < count; ++start) {
    let current = start;
    let prev = nums[start];
    do {
      const next = (current + k) % n;
      const temp = nums[next];
      nums[next] = prev;
      prev = temp;
      current = next;
    } while (start !== current);
  }
};
```

**官方-复杂度分析**  
`时间复杂度`：O(n)，其中 n 为数组的长度。每个元素只会被遍历一次。  
`空间复杂度`：O(1)。我们只需常数空间存放若干变量。
