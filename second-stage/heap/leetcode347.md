## 347. 前 K 个高频元素

**描述**

> 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。

**实例**

```
1、
  输入: nums = [1,1,1,2,2,3], k = 2
  输出: [1,2]
2、
  输入: nums = [1], k = 1
  输出: [1]
```

> 提示：
>
> - 1 <= nums.length <= 105
> - k 的取值范围是 [1, 数组中不相同的元素的个数]
> - 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的

> 进阶：你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n  是数组大小。

**思路**

```

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
    if (
      this.heap[parentIndex] &&
      this.heap[parentIndex].value > this.heap[index].value
    ) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (
      this.heap[leftIndex] &&
      this.heap[leftIndex].value < this.heap[index].value
    ) {
      this.swap(leftIndex, index);
      this.shiftDown(leftIndex);
    }
    if (
      this.heap[rightIndex] &&
      this.heap[rightIndex].value < this.heap[index].value
    ) {
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
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  nums.forEach((e) => {
    map.set(e, map.has(e) ? map.get(e) + 1 : 1);
  });
  const tempHeap = new MinHeap();
  map.forEach((value, key) => {
    tempHeap.insert({ value, key });
    if (tempHeap.size() > k) {
      tempHeap.pop();
    }
  });

  return tempHeap.heap.map((e) => e.key);
};
```

**实现-复杂度分析**  
`时间复杂度`：O(nlogk)，因为使用了嵌套循环，第二个 map 的 forEach 时间复杂度为 n，而里面的 heap 的 inser 与 pop 的时间复杂度是 logk，故渐进时间复杂度为 O(nlogk)  
`空间复杂度`：O(n)，因为使用了 map 进行数据的存储，n 代表 nums 的长度。

**官方**

```java
// java
class Solution {
  public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> occurrences = new HashMap<Integer, Integer>();
    for (int num : nums) {
      occurrences.put(num, occurrences.getOrDefault(num, 0) + 1);
    }

    // int[] 的第一个元素代表数组的值，第二个元素代表了该值出现的次数
    PriorityQueue<int[]> queue = new PriorityQueue<int[]>(new Comparator<int[]>() {
      public int compare(int[] m, int[] n) {
        return m[1] - n[1];
      }
    });
    for (Map.Entry<Integer, Integer> entry : occurrences.entrySet()) {
      int num = entry.getKey(), count = entry.getValue();
      if (queue.size() == k) {
        if (queue.peek()[1] < count) {
          queue.poll();
          queue.offer(new int[]{num, count});
        }
      } else {
        queue.offer(new int[]{num, count});
      }
    }
    int[] ret = new int[k];
    for (int i = 0; i < k; ++i) {
      ret[i] = queue.poll()[0];
    }
    return ret;
  }
}
```

**官方-复杂度分析**  
`时间复杂度`：O(Nlogk)，其中 N 为数组的长度。我们首先遍历原数组，并使用哈希表记录出现次数，每个元素需要 O(1) 的时间，共需 O(N) 的时间。随后，我们遍历「出现次数数组」，由于堆的大小至多为 k，因此每次堆操作需要 O(logk) 的时间，共需 O(Nlogk) 的时间。二者之和为 O(Nlogk)。  
`空间复杂度`：O(N)。哈希表的大小为 O(N)，而堆的大小为 O(k)，共计为 O(N)。
