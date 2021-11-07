/******************************************
*                                         *
*                MinHeap                  *
*                                         *
******************************************/
class MinHeap {
  constructor() {
    this.heap = []
  }

  getLeftIndex(index) {
    return 2 * index + 1
  }

  getRightIndex(index) {
    return 2 * index + 2
  }

  getParentIndex(index) {
    if (index === 0) return null;
    return Math.floor((index - 1) / 2)
  }

  size() {
    return this.heap.length
  }

  isEmpty() {
    return this.size() <= 0
  }

  clear() {
    this.heap = []
  }

  // 交换
  swap(array, a, b) {
    return [array[a], array[b]] = [array[b], array[a]];
  }

  // 查找最小值
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  // 插入
  insert(value) {
    if (value) {
      this.heap.push(value)
      this.siftUp(this.heap.length - 1)
      return true
    }
    return false
  }

  // 上移
  siftUp(index) {
    let parent = this.getParentIndex(index)
    while (
      index > 0 &&
      this.heap[parent] > this.heap[index]
    ) {
      this.swap(this.heap, parent, index)
      index = parent
      parent = this.getParentIndex(index)
    }
  }

  // 下移（堆化）
  siftDown(index) {
    let element = index
    const left = this.getLeftIndex(index)
    const right = this.getRightIndex(index)
    const size = this.size()
    if (
      left < size &&
      this.heap[element] > this.heap[left]
    ) {
      element = left
    }
    if (
      right < size &&
      this.heap[element] > this.heap[right]
    ) {
      element = right
    }
    if (index !== element) {
      this.swap(this.heap, index, element)
      this.siftDown(element)
    }
  }

  // 移除最小值
  extract() {
    if (this.isEmpty()) return undefined;
    if (this.size() === 1) return this.heap.shift();

    const removedValue = this.heap[0]
    this.heap[0] = this.heap.pop()
    this.siftDown(0)
    return removedValue
  }

}

// test MinHeap
// const xxx = new MinHeap()

// xxx.insert(2)
// xxx.insert(3)
// xxx.insert(4)
// xxx.insert(5)
// xxx.insert(1)

// console.log(xxx);

// xxx.extract()

// console.log(xxx);

/******************************************
*                                         *
*                MaxHeap                  *
*                                         *
******************************************/
class MaxHeap {
  constructor() {
    this.heap = []
  }

  getLeftIndex(index) {
    return 2 * index + 1
  }

  getRightIndex(index) {
    return 2 * index + 2
  }

  getParentIndex(index) {
    if (index === 0) return null;
    return Math.floor((index - 1) / 2)
  }

  size() {
    return this.heap.length
  }

  isEmpty() {
    return this.size() <= 0
  }

  clear() {
    this.heap = []
  }

  // 交换
  swap(array, a, b) {
    return [array[a], array[b]] = [array[b], array[a]];
  }

  // 查找最小值
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  // 插入
  insert(value) {
    if (value) {
      this.heap.push(value)
      this.siftUp(this.heap.length - 1)
      return true
    }
    return false
  }

  // 上移
  siftUp(index) {
    let parent = this.getParentIndex(index)
    while (
      index > 0 &&
      this.heap[parent] < this.heap[index] // 区别
    ) {
      this.swap(this.heap, parent, index)
      index = parent
      parent = this.getParentIndex(index)
    }
  }

  // 下移（堆化）
  siftDown(index) {
    let element = index
    const left = this.getLeftIndex(index)
    const right = this.getRightIndex(index)
    const size = this.size()
    if (
      left < size &&
      this.heap[element] < this.heap[left] // 区别
    ) {
      element = left
    }
    if (
      right < size &&
      this.heap[element] < this.heap[right] // 区别
    ) {
      element = right
    }
    if (index !== element) {
      this.swap(this.heap, index, element)
      this.siftDown(element)
    }
  }

  // 移除最小值
  extract() {
    if (this.isEmpty()) return undefined;
    if (this.size() === 1) return this.heap.shift();

    const removedValue = this.heap[0]
    this.heap[0] = this.heap.pop()
    this.siftDown(0)
    return removedValue
  }
}

// test MaxHeap
const xxx = new MaxHeap()

xxx.insert(2)
xxx.insert(3)
xxx.insert(4)
xxx.insert(5)

xxx.insert(1)

console.log(xxx);

