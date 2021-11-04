## 912. 排序数组

**描述**

> 给你一个整数数组 nums，请你将该数组升序排列。

**实例**

```
1、
  输入：nums = [5,2,3,1]
  输出：[1,2,3,5]
2、
  输入：nums = [5,1,1,2,0,0]
  输出：[0,0,1,1,2,5]
```

> 提示：
>
> - 1 <= nums.length <= 50000
> - -50000 <= nums[i] <= 50000

**思路**

```
1、将数组二分
2、大小比较排序
```

**实现**

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  return mergeSort(nums);
};

const mergeSort = (arr) => {
  if (arr.length > 1) {
    const { length } = arr;
    const middle = Math.floor(length / 2);
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle, length));
    arr = merge(left, right);
  }

  return arr;
};

const merge = (left, right) => {
  let i = 0;
  let j = 0;
  const res = [];

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i++]);
    } else {
      res.push(right[j++]);
    }
  }

  return res.concat(i < left.length ? left.slice(i) : right.slice(j));
};
```

**实现-复杂度分析**  
`时间复杂度`：O(nlog(n))，因为使用了归并排序，所以时间复杂度为 O(nlog(n))  
`空间复杂度`：O(n)，因为使用了临时数组 res 队数据进行了存储，所以 n 代表数组的长度

**官方**

> ![image](https://assets.leetcode-cn.com/solution-static/912/912_fig1.gif)

```java
class Solution {
  public int[] sortArray(int[] nums) {
    randomizedQuicksort(nums, 0, nums.length - 1);
    return nums;
  }

  public void randomizedQuicksort(int[] nums, int l, int r) {
    if (l < r) {
      int pos = randomizedPartition(nums, l, r);
      randomizedQuicksort(nums, l, pos - 1);
      randomizedQuicksort(nums, pos + 1, r);
    }
  }

  public int randomizedPartition(int[] nums, int l, int r) {
    int i = new Random().nextInt(r - l + 1) + l; // 随机选一个作为我们的主元
    swap(nums, r, i);
    return partition(nums, l, r);
  }

  public int partition(int[] nums, int l, int r) {
    int pivot = nums[r];
    int i = l - 1;
    for (int j = l; j <= r - 1; ++j) {
      if (nums[j] <= pivot) {
        i = i + 1;
        swap(nums, i, j);
      }
    }
    swap(nums, i + 1, r);
    return i + 1;
  }

  private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
}

```

**官方-复杂度分析**  
`时间复杂度`：基于随机选取主元的快速排序时间复杂度为期望 O(nlog(n))，其中 n 为数组的长度。详细证明过程可以见《算法导论》第七章，这里不再大篇幅赘述。  
`空间复杂度`：O(h)，其中 h 为快速排序递归调用的层数。我们需要额外的 O(h) 的递归调用的栈空间，由于划分的结果不同导致了快速排序递归调用的层数也会不同，最坏情况下需 O(n) 的空间，最优情况下每次都平衡，此时整个递归树高度为 log(n)，空间复杂度为 O(log(n))。
