## 215. 数组中的第 K 个最大元素

**描述**

> 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
> 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

**实例**

```
1、
  输入: [3,2,1,5,6,4] 和 k = 2
  输出: 5
2、
  输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
  输出: 4
```

**思路**

```
1、使用堆 - 最小堆
2、堆的长度大于k，就删除堆顶
3、最后堆顶就是第k个最大元素
```

**实现**

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }
  getParentIndex(i) {
    return (i - 1) >> 1;
  }
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  getRightIndex(i) {
    return i * 2 + 2;
  }
  shiftUp(index) {
    if (index == 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index);
      this.shiftDown(rightIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const h = new MinHeap();
  nums.forEach((e) => {
    h.insert(e);
    if (h.size() > k) {
      h.pop();
    }
  });

  return h.peek();
};
```

**实现-复杂度分析**  
`时间复杂度`：O(n\*log(k))，因为有个 for 循环 n，而且 inset 和 pop 是个递归操作，所以是循环套循环，所以 log(k)，k 是堆大小  
`空间复杂度`：O(k)，k 就是参数 k，维护的堆的大小

**官方**

```java
// java
class Solution {
  public int findKthLargest(int[] nums, int k) {
    int heapSize = nums.length;
    buildMaxHeap(nums, heapSize);
    for (int i = nums.length - 1; i >= nums.length - k + 1; --i) {
      swap(nums, 0, i);
      --heapSize;
      maxHeapify(nums, 0, heapSize);
    }
    return nums[0];
  }

  public void buildMaxHeap(int[] a, int heapSize) {
    for (int i = heapSize / 2; i >= 0; --i) {
      maxHeapify(a, i, heapSize);
    }
  }

  public void maxHeapify(int[] a, int i, int heapSize) {
    int l = i * 2 + 1, r = i * 2 + 2, largest = i;
    if (l < heapSize && a[l] > a[largest]) {
      largest = l;
    }
    if (r < heapSize && a[r] > a[largest]) {
      largest = r;
    }
    if (largest != i) {
      swap(a, i, largest);
      maxHeapify(a, largest, heapSize);
    }
  }

  public void swap(int[] a, int i, int j) {
    int temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
}

```

**官方-复杂度分析**  
`时间复杂度`：O(nlogn)，建堆的时间代价是 O(n)，删除的总代价是 O(klogn)，因为 k < n，故渐进时间复杂为 O(n+klogn) = O(nlogn)。  
`空间复杂度`：O(logn)，即递归使用栈空间的空间代价。
